import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OrdersTable extends Component {

  // columns for poopulating orders table
  columns = [
    {
      path: "address",
      label: "Pickup Location",
      content: (order) => (
        <Link to={`/parcels/${order.id}`}>{order.address}</Link>
      ),
    },
    { path: "destination", label: "Destination" },
    { path: "description", label: "Description" },
    { path: "weight", label: "Weight (kg)" },
    { path: "status", label: "Parcel Status" },
    { path: "deliveryAgent", label: "Assigned Driver" },

  ];

  // below columns rendered conditionally

  deleteColumn = {
    key: "delete",
    content: (order) => (
      <button
        onClick={() => this.props.onDelete(order)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  acceptColumn = {
    key: "accept",
    content: (order) => (
      <button
        onClick={() => this.props.onAccept(order)}
        className="btn btn-danger btn-sm"
      >
        Accept 
      </button>
    ),
  };

  constructor(props) {
    super(props);

    const userString = auth.getCurrentUser();
    const user=JSON.parse(userString);

    // customers get option for deleting orders
    if (user && user.accountType==="customer") this.columns.push(this.deleteColumn);

    // drivers get option for accepting orders
    if (user && user.accountType==="driver") this.columns.push(this.acceptColumn);
  }

  render() {
    // current user object retrieved from local storage
    const userString = auth.getCurrentUser();
    const user=JSON.parse(userString);

    // below props are received from parent component
    const { sortColumn, onSort } = this.props;

    // all orders received as a prop
    let {orders:allOrders} = this.props;

    //if the user is a customer, he is only allowed to see his own orders
    if(user.accountType==="customer"){
      allOrders = allOrders.filter((o) => o.owner === user.email);
    }

    //if the user is a driver, he is only allowed to see his own jobs and unassigned jobs
    if(user.accountType==="driver"){
      allOrders = allOrders.filter((o) => o.deliveryAgent === "Unassigned" || o.deliveryAgent === user.email);
    }

    //console.log(allOrders)


    return (
      <Table
        columns={this.columns}
        data={allOrders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default OrdersTable;
