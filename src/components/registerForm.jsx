import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  // state initialised with empty variables

  state = {
    data: {
      username: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    errors: {},
  };

// schema for validating user input using Joi package

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
    phoneNumber: Joi.string().required().max(10).label("Phone Number"),
    uType:Joi.string().required().max(8).label("User Type"),
  };

  doSubmit = async () => {
    try {
      // register function called with form data
      const response = await userService.register(this.state.data);
      //user type retrieved from server response data
      const {uType}=this.state.data
      response.data.accountType=uType

      // login function called with response data object (needed for local storage)
      auth.loginWithJwt(response.data);
      // user sent to home page
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // render register page with neccesary components
    return (
      <div>
      <h1>Register</h1>
      <form onSubmit={this.handleSubmit}>
      {this.renderInput("username", "Username")}
      {this.renderInput("password", "Password", "password")}
      {this.renderInput("name", "Name")}
      {this.renderInput("phoneNumber", "Phone Number")}
      {this.renderSelect("uType", "User Type",[{_id:"customer",name:"Customer"},{_id:"driver",name:"Driver"}])}
      {this.renderButton("Register")}
      </form>
      </div>
    );
  }
}

export default RegisterForm;
