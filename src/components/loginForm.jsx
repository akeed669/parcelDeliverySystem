import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {

  // state initialised with empty variables
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

// schema for validating user input using Joi package
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    uType:Joi.string().required().max(8).label("User Type"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      // calling login function with form data
      await auth.login(data.username, data.password, data.uType);

      const { state } = this.props.location;
      // redirect user to home page or desired page
      // get location of user before logging in
      window.location = state ? state.from.pathname : "/";

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {

        // errors object reset if any errors encountered
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {

    // if user is already logged in redirect to home page
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    // render login form with neccesary input components
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("uType", "User Type",[{_id:"customer",name:"Customer"},{_id:"driver",name:"Driver"}])}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
