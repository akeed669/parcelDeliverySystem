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
    views: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    selectedView: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {

    // array to hold the different view types
    const viewsArray = [{id:100,viewName:"All"},{id:0,viewName:"New"},{id:1,viewName:"Pending"},{id:2,viewName:"Completed"}];

    // make api call to get all orders from server
    let { data: orders } = await getOrders();

    //access props passed by parent componentDidMount
    //user details are received
    const {uemail,uType,user,driverProfile}=this.props;

    this.setState({ orders, views:viewsArray });

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
    this.setState({ searchQuery: query, selectedView: null, currentPage: 1 });
  };

  //when user selects different view type
  handleViewSelect = view => {
    this.setState({ selectedView: view, searchQuery: "", currentPage: 1 });
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
      selectedView,
      searchQuery,
      orders: allOrders,
    } = this.state;

    // filtering to show orders with name matching search query
    let filtered = allOrders;
    if (searchQuery)
      filtered = allOrders.filter((o) =>
        o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    //filter orders array if particular view type selected
    else if (selectedView) {
      if(selectedView.id === 100){
        filtered = allOrders;
      }
      else{
        filtered = allOrders.filter(m => m.status === selectedView.id);
      }

    }

    // for ordering data according to selected column
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // using custom function to display page dynamically
    const orders = paginate(sorted, currentPage, pageSize);

    // return orders and number of orders
    return { totalCount: orders.length, data: orders };
  }

  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, searchQuery, sortColumn, views, selectedView } = this.state;

    const {uemail,uType,user,driverProfile}=this.props;

    const { totalCount, data: orders } = this.getPagedData();
    console.log(orders)

    return (
      <div className="row">
        <div className="col-3">

        {/*render the view types as a group - user able to filter*/}

          <ListGroup
            textProperty="viewName"
            items={views}
            selectedItem={selectedView}
            onItemSelect={this.handleViewSelect}
          />
        </div>
        {user && (
          <div className="col">

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
