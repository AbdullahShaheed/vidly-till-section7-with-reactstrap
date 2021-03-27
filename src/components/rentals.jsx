import React, { useState, useEffect } from "react";
import { getMovies } from "./../services/fakeMovieService";
import { Typeahead } from "react-bootstrap-typeahead";

const Rentals = (props) => {
  const [name, setName] = useState("");
  const [multiNames, setMultiNames] = useState([]);
  const [customer, setCustomer] = useState(null);

  const [movie, setMovie] = useState({});
  const [multiMovies, setMultiMovies] = useState([]);

  const movies = getMovies();

  const names = [
    "Ahmed Jamal",
    "Karim",
    "Sara Ali",
    "Majid Hamad",
    "Sami Ahmed",
    "Mazin Omar",
    "Nada Salwan",
    "Naji Karim",
    "Salwan Jaber",
    "Najih Marzooq",
  ];

  const customers = [
    { id: 1, name: "Ahmed Jamal" },
    { id: 2, name: "Karim" },
    { id: 3, name: "Sara Ali" },
    { id: 4, name: "Majid Hamad" },
    { id: 5, name: "Sami Ahmed" },
    { id: 6, name: "Mazin Omar" },
    { id: 7, name: "Nada Salwan" },
    { id: 8, name: "Naji Karim" },
    { id: 9, name: "Salwan Jaber" },
    { id: 10, name: "Najih Marzooq" },
  ];
  return (
    <>
      <h1>Rentals</h1>

      <div className="row">
        <div className="col">
          <label>Select a name</label>
          <Typeahead
            id="first"
            options={names}
            onChange={(selected) => setName(selected)}
            minLength={2}
            placeholder="Enter two characters or more, then select the name.."
          />
        </div>

        <div className="col">
          <label>Select multiple names</label>
          <Typeahead
            id="forth"
            multiple
            options={names}
            onChange={(selected) => {
              setMultiNames(selected);
              console.log(selected);
            }}
          />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col">
          <label>Select a movie</label>
          <Typeahead
            id="third"
            labelKey="title"
            options={movies}
            minLength={2}
            onChange={(selected) => {
              setMovie(selected);
              console.log(selected);
            }}
          />
        </div>

        <div className="col">
          <label>Select a customer</label>
          <Typeahead
            labelKey="name"
            id="second"
            options={customers}
            minLength={2}
            onChange={(selected) => {
              setCustomer(selected);

              console.log(selected);
              console.log(selected[0]);
            }}
          />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col">
          <label>Select multiple movies</label>
          <Typeahead
            id="fifth"
            labelKey="title"
            multiple
            minLength={2}
            options={movies}
            onChange={(selected) => {
              setMultiMovies(selected);
              console.log(selected);
            }}
          />

          <ul>
            {multiMovies.map((m) => (
              <li key={m._id}>{m.title}</li>
            ))}
          </ul>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
};

export default Rentals;
