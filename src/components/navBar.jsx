import React from "react";
import { Link, NavLink } from "react-router-dom";
import Input from "./common/input";

const NavBar = ({ user, uType }) => {

  const textForTabOne = uType==="customer"?"My Orders":"New Orders";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <div className="collapse navbar-collapse" id="navbarNav">
        <h4 className="nav item nav-header ml-1">ParcelBox</h4>
        <div className="navbar-nav">
          {user && (
            <React.Fragment>

              <NavLink className="nav-item nav-link ml-3" to="/deliveries">
                {textForTabOne}
              </NavLink>

              {uType==="driver" &&(<NavLink className="nav-item nav-link ml-3" to="/profile">
                {user + " - Profile"}
              </NavLink>)}
              <NavLink className="nav-item nav-link ml-3" to="/logout">
                Logout
              </NavLink>
              {uType==="customer" && (<h4 className="nav-item nav-header ml-3 mt-1">{user}</h4>)}
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link ml-3" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link ml-3" to="/register">
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
