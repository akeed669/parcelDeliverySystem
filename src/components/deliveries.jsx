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
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {

    let { data: orders } = await getOrders();
    const {uemail,uType,user,driverProfile}=this.props; 

    this.setState({ orders });

  }

  handleDelete = async (order) => {
    const originalOrders = this.state.orders;
    const orders = originalOrders.filter((o) => o.id !== order.id);
    this.setState({ orders });

    try {
      await deleteOrder(order.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");

      this.setState({ orders: originalOrders });
    }
  };

  handleAccept = async (order) => {

    let myOrder={...order};

    myOrder.status=1;
    myOrder.deliveryAgent=this.props.uemail;

    const originalOrders = this.state.orders;
    const orders = originalOrders.filter((o) => o.id !== order.id);
    this.setState({ orders });

    try {
      await updateParcelStatus(myOrder);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");

        this.setState({ orders: originalOrders });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      orders: allOrders,
    } = this.state;

    let filtered = allOrders;
    if (searchQuery)
      filtered = allOrders.filter((o) =>
        o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id) {
    //   filtered = allOrders.filter((m) => m.genre._id === selectedGenre._id);
    // }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const orders = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: orders };
  }

  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    const {uemail,uType,user,driverProfile}=this.props;
    // if (count === 0) return <p>There are no orders in the database.</p>;

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
            onDelete={this.handleDelete}
            onAccept={this.handleAccept}
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
