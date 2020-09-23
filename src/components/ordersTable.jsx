import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OrdersTable extends Component {
  columns = [
    {
      path: "address",
      label: "Address",
      content: (order) => (
        <Link to={`/parcels/${order.id}`}>{order.address}</Link>
      ),
    },
    { path: "destination", label: "Destination" },
    { path: "description", label: "Description" },
    { path: "weight", label: "Weight" },
    { path: "status", label: "Parcel Status" },

  ];

  acceptColumn = {
    key: "completed",
    content: (order) => (
      <button
        onClick={() => this.props.onAccept(order)}
        className="btn btn-success btn-sm"
      >
        Accept
      </button>
    ),
  };

  cancelColumn = {
    key: "canceled",
    content: (order) => (
      <button
        onClick={() => this.props.onAccept(order)}
        className="btn btn-success btn-sm"
      >
        Cancel
      </button>
    ),
  };

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

  confirmDeliveryColumn = {
    key: "confirmdelivery",
    content: (order) => (
      <button
        onClick={() => this.props.onConfirmDelivery(order)}
        className="btn btn-success btn-sm"
      >
        Delivered
      </button>
    ),
  };

  confirmPickupAsDriver = {
    key: "driverpickup",
    content: (order) => (
      <button
        onClick={() => this.props.onConfirmDelivery(order)}
        className="btn btn-success btn-sm"
      >
        Delivered
      </button>
    ),
  };

  constructor(props) {
    super(props);
    const userString = auth.getCurrentUser();
    const user=JSON.parse(userString);
    const {showDriverOrders}=this.props;


    if (user && user.accountType==="customer") this.columns.push(this.deleteColumn);

  }

  render() {

    const userString = auth.getCurrentUser();
    const user=JSON.parse(userString);

    const { sortColumn, onSort, showDriverOrders } = this.props;

    let {orders:allOrders} = this.props;
    let ordersCopy=[...allOrders];
    // console.log(user)
    // console.log(allOrders)

    //if the user is a customer, he is only allowed to see his own orders
    if(user.accountType==="customer"){
      allOrders = allOrders.filter((o) => o.owner === user.email);
    }

    if(user.accountType==="driver"){

      //filtering only the orders which are not yet assigned to any driver
      allOrders = allOrders.filter((o) => o.deliveryAgent === "Unassigned");


      //filtering only those orders that have been already accepted by the logged in driver
      if(showDriverOrders){
        ordersCopy = ordersCopy.filter((o) => o.deliveryAgent === user.email);
      }
    }


    return (
      <Table
        columns={this.columns}
        data={(showDriverOrders && ordersCopy)|| allOrders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default OrdersTable;
