import React, { Component } from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import ConfirmModal from "./common/confirmDeleteModal";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchString: "",
    movieToDelete: null,
    modalVisible: false,
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  toggleConfirmModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleDelete = (movie) => {
    this.setState({ movieToDelete: movie });
    this.toggleConfirmModal();
  };
  doDelete = () => {
    let { movies, movieToDelete } = this.state;
    movies = movies.filter((m) => m._id !== movieToDelete._id);
    this.setState({ movies });

    this.toggleConfirmModal();
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...this.state.movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchString: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchString: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre,
      searchString,
    } = this.state;

    //filter the array ==> sort it ==> paginate it  (we implement these operations all on client side)
    let filtered = allMovies;

    if (searchString)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().includes(searchString.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies: data };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre,
      searchString,
    } = this.state;

    const { totalCount, movies } = this.getPagedData();

    // if (totalCount === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            items={genres}
            selectedItem={selectedGenre}
          ></ListGroup>
        </div>
        <div className="col">
          <Link
            //'new' will be the id parameter, because anything after 'movies/' will be 'id' accoring
            //to the route in App.js, <Route path="/movies/:id" component={MovieForm}></Route>. And we will depend on this to determine the new movie
            to="/movies/new"
            className="btn btn-primary mb-1"
          >
            New Movie
          </Link>
          <p>Showing {totalCount} in the database.</p>

          <SearchBox
            value={searchString}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          ></MoviesTable>

          <Pagination
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
            itemsCount={totalCount}
            currentPage={currentPage}
          ></Pagination>
          <ConfirmModal
            visible={this.state.modalVisible}
            onCancel={this.toggleConfirmModal}
            onConfirm={this.doDelete}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
