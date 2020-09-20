import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    errors: {},
    utypes:['dfdf','dff']
  };


  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
    phoneNumber: Joi.string().required().max(10).label("Phone Number"),

  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      console.log(response.data)
      //auth.loginWithJwt(response.headers["x-auth-token"]);
      auth.loginWithJwt(response.data.fullname);
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
    return (
      <div>
      <h1>Register</h1>
      <form onSubmit={this.handleSubmit}>
      {this.renderInput("username", "Username")}
      {this.renderInput("password", "Password", "password")}
      {this.renderInput("name", "Name")}
      {this.renderInput("phoneNumber", "Phone Number")}
      {this.renderButton("Register")}
      </form>
      </div>
    );
  }
}
//<form onSubmit={this.handleSubmit}>
export default RegisterForm;
