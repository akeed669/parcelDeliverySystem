import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import OrdersTable from "./ordersTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getOrders, deleteOrder, saveOrder, updateParcelStatus } from "../services/orderService";
import auth from "../services/authService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Deliveries extends Component {
  // state variable for storing orders and ..
  // .. storing page/sort and search query details
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {

    // make api call to get all orders from server
    let { data: orders } = await getOrders();

    //filtering to show only unassigned parcels
    const newOrders = orders.filter((o) => o.deliveryAgent === "Unassigned");

    //access props passed by parent componentDidMount
    //user details are received
    const {uemail,uType,user,driverProfile}=this.props;

    this.setState({ orders:newOrders });

  }

  // function for deleting an order as customer
  handleDelete = async (order) => {
    const originalOrders = this.state.orders;
    const orders = originalOrders.filter((o) => o.id !== order.id);
    // orders in DOM are filtered before delete operation
    this.setState({ orders });

    try {
      // make api call to delete order
      await deleteOrder(order.id);
    } catch (ex) {
      // toast message for exceptions
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");
      // if delete operation fails, orders are reset to previous state
      this.setState({ orders: originalOrders });
    }
  };

 //function to accept order as driver
  handleAccept = async (order) => {

    let myOrder={...order};

    myOrder.status=1;
    myOrder.deliveryAgent=this.props.uemail;

    const originalOrders = this.state.orders;
    const orders = originalOrders.filter((o) => o.id !== order.id);
    // orders in DOM are filtered before update operation
    this.setState({ orders });

    try {
      //make api call to update order
      await updateParcelStatus(myOrder);
    } catch (ex) {
      // toast message for exceptions
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");
        // if update operation fails, orders are reset to previous state
        this.setState({ orders: originalOrders });
    }
  };

 //change displayed page when user clicks on a page number
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //method runs when user enters something on search box
  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  //sorts column when user clicks on column header
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  //method called when rendering component
  //returns orders, selected page, sorted column, search query etc.
  getPagedData() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      orders: allOrders,
    } = this.state;

    // filtering to show orders with name matching search query
    let filtered = allOrders;
    if (searchQuery)
      filtered = allOrders.filter((o) =>
        o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    // for ordering data according to selected column
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // using custom function to display page dynamically
    const orders = paginate(sorted, currentPage, pageSize);
    // return orders and number of orders
    return { totalCount: filtered.length, data: orders };
  }

  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    const {uemail,uType,user,driverProfile}=this.props;

    const { totalCount, data: orders } = this.getPagedData();

    return (
      <div className="row">
        {user && (<div className="col">

            {uType==="customer" && (<Link
              to="parcels/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Order
            </Link>)}

          <p>Showing {totalCount} orders in the database.</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <OrdersTable
            orders={orders}
            sortColumn={sortColumn}
            onAccept={this.handleAccept}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            showDriverOrders={driverProfile}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        )}
      </div>
    );
  }
}

export default Deliveries;
