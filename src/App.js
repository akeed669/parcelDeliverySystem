import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Deliveries from "./components/deliveries";
import DriverDeliveries from "./components/driverDeliveries";
import OrderForm from "./components/orderForm";
import OrderEditForm from "./components/orderEditForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";

import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

// set state variables to hold user values
class App extends Component {
  state = {
    fullname:"",
    email:"",
    accountType:""
  };

  componentDidMount() {
    //retrieve current user object from local storage
    const userObjectString = auth.getCurrentUser();

    if(userObjectString !== null){

      const user=JSON.parse(userObjectString);
      const {fullname,email,accountType}=user;

      // state variables are set to hold user information

      this.setState({fullname:fullname, email:email, accountType:accountType });
    }
  }

  render() {

    const { fullname, email, accountType } = this.state;

    // render Route components to direct to endpoints
    // ProtectedRoute components requires a user to be logged in
    // name and type of user passed to navigation bar
    return (
      <React.Fragment>
      <ToastContainer />
      <NavBar user={fullname} uType={accountType} />
      <main className="container">
      <Switch>
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/logout" component={Logout} />

      <ProtectedRoute
      path="/parcels/new"
      render={(props) => <OrderForm {...props} email={email} />}
      />

      <ProtectedRoute
      path="/parcels/:id"
      render={(props) => <OrderEditForm {...props} email={email} uType={accountType} />}
      />

      <ProtectedRoute
      path="/deliveries"
      render={(props) => <Deliveries {...props} user={fullname} uemail={email} uType={accountType} driverProfile={false}/>}
      />

      <ProtectedRoute
      path="/profile"
      render={(props) => <Deliveries {...props} user={fullname} uemail={email} uType={accountType} driverProfile={true}/>}
      />

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
