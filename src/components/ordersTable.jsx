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

  //   {
  //     content: (order) => (
  //       <button
  //         onClick={() => this.props.onDelete(order)}
  //         className="btn btn-success btn-sm"
  //       >
  //         Completed
  //       </button>
  //     ),
  //   },
  //
  //   {
  //     content: (order) => (
  //       <button
  //         onClick={() => this.props.onDelete(order)}
  //         className="btn btn-danger btn-sm"
  //       >
  //         Delete
  //       </button>
  //     ),
  //   },

  // {
  //   key: "delete",
  //   content: (order) => (
  //     <button
  //       onClick={() => this.props.onDelete(order)}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Delete
  //     </button>
  //   ),
  // }

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

  constructor() {
    super();
    const userString = auth.getCurrentUser();
    const user=JSON.parse(userString);
    console.log(typeof user)
    if (user && user.accountType==="customer") this.columns.push(this.deleteColumn);
    if (user && user.accountType==="driver") this.columns.push(this.acceptColumn);
  }

  render() {
    const { orders, sortColumn, onSort } = this.props;
    //console.log(orders)
    return (
      <Table
        columns={this.columns}
        data={orders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default OrdersTable;
