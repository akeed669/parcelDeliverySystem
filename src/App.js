import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Deliveries from "./components/deliveries";
import OrderForm from "./components/orderForm";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {
    fullname:"",
    email:""
  };

  componentDidMount() {
    const userObjectString = auth.getCurrentUser();
    //console.log("ponsi" + userObjectString)
    if(userObjectString !== null){

      const user=JSON.parse(userObjectString);
      const fullname=user.fullname;
      const email=user.email;

      this.setState({fullname:fullname, email:email });
    }
    //this.setState({ userObjectString });
  }

  render() {

    const { fullname, email } = this.state;

    return (
      <React.Fragment>
      <ToastContainer />
      <NavBar user={fullname} />
      <main className="container">
      <Switch>
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/logout" component={Logout} />

      <ProtectedRoute
      path="/orders/:id"
      render={(props) => <OrderForm {...props} email={email} />}
      />

      <Route
      path="/deliveries"
      render={(props) => <Deliveries {...props} user={fullname} />}
      />

      <Route path="/customers" component={Customers} />
      <Route path="/not-found" component={NotFound} />
      <Redirect from="/" exact to="/deliveries" />
      <Redirect to="/not-found" />
      </Switch>
      </main>
      </React.Fragment>
    );
  }
}

export default App;
