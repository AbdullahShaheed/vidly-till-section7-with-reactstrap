/* This navbar is reactstrap component fully functional*/

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Vidly</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/contact-us">
                Contact Us
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
