import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OrdersTable from "./OrdersTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getOrders, deleteOrder } from "../services/orderService";
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
    //const { data } = await getGenres();
    //const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: orders } = await getOrders();
    this.setState({ orders });

  }

  handleDelete = async (order) => {
    const originalOrders = this.state.orders;
    const orders = originalOrders.filter((o) => o._id !== order._id);
    this.setState({ orders });

    try {
      await deleteOrder(order._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");

      this.setState({ orders: originalOrders });
    }
  };

  //   handleLike = (movie) => {
  //     const orders = [...this.state.orders];
  //     const index = orders.indexOf(movie);
  //     orders[index] = { ...orders[index] };
  //     orders[index].liked = !orders[index].liked;
  //     this.setState({ orders });
  //   };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //   handleGenreSelect = (genre) => {
  //     this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  //   };

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
    const { user } = this.props;

    // if (count === 0) return <p>There are no orders in the database.</p>;

    const { totalCount, data: orders } = this.getPagedData();
    //console.log(orders)

    return (
      <div className="row">
        <div className="col">
          {user && (
            <Link
              to="orders/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Order
            </Link>
          )}
          <p>Showing {totalCount} orders in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <OrdersTable
            orders={orders}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Deliveries;
