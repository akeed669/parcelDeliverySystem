import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/parcels";

function orderUrl(id) {
  // generates an endpoint for getting/deleting/saving..
  // ..a particular order
  return `${apiEndpoint}/${id}`;
}

function parcelUrl(optURI,id) {
  // generates an endpoint for updating an order
  return `${apiEndpoint}/${optURI}/${id}`;
}

export function getOrders() {
  // get all parcel orders
  return http.get(apiEndpoint);
}

export function getOrder(orderId) {
  //get a particular order
  return http.get(orderUrl(orderId));
}

export function saveOrder(order) {
  if (order.id) {

    // create a new parcel

    const body = { ...order };
    delete body.id;
    return http.put(orderUrl(order.id), body);
  }

  return http.post(apiEndpoint, order);
}

export function updateParcelStatus(order) {
  if (order.id) {
    const body = { ...order };
    delete body.id;

    const optURI="/parcel"

    // update a parcel

    return http.put(parcelUrl(optURI,order.id), body);
  }

  return http.post(apiEndpoint, order);
}

export function deleteOrder(orderId) {

  // delete a parcel
  return http.delete(orderUrl(orderId));
}
