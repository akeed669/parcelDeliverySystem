import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OrdersTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (order) => (
        <Link to={`/orders/${order._id}`}>{order.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },

    {
      content: (order) => (
        <button
          onClick={() => this.props.onDelete(order)}
          className="btn btn-success btn-sm"
        >
          Completed
        </button>
      ),
    },

    {
      content: (order) => (
        <button
          onClick={() => this.props.onDelete(order)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  // completedColumn = {
  //   key: "completed",
  //   content: (order) => (
  //     <button
  //       onClick={() => this.props.onDelete(order)}
  //       className="btn btn-success btn-sm"
  //     >
  //       Completed
  //     </button>
  //   ),
  // };

  // deleteColumn = {
  //   key: "delete",
  //   content: (order) => (
  //     <button
  //       onClick={() => this.props.onDelete(order)}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Delete
  //     </button>
  //   ),
  // };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    //if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { orders, sortColumn, onSort } = this.props;
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
