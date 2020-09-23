import React from "react";
import { Link, NavLink } from "react-router-dom";
import Input from "./common/input";

const NavBar = ({ user, uType }) => {

  const textForTabOne = uType==="customer"?"My Orders":"New Orders";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <h4 className="nav item nav-header">ParcelBox</h4>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          {user && (
            <React.Fragment>
            <h4 className="nav-item nav-header">{user}</h4>
              <NavLink className="nav-item nav-link" to="/deliveries">
                {textForTabOne}
              </NavLink>

              {uType==="driver" &&(<NavLink className="nav-item nav-link" to="/profile">
                {user + " - Profile"}
              </NavLink>)}
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
