import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/parcels";

function orderUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function parcelUrl(optURI,id) {
  return `${apiEndpoint}/${optURI}/${id}`;
}

export function getOrders() {
  return http.get(apiEndpoint);
}

export function getOrder(orderId) {

  return http.get(orderUrl(orderId));
}

export function saveOrder(order) {
  if (order.id) {
    console.log("jojooo")
    console.log(order)

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
    return http.put(parcelUrl(optURI,order.id), body);
  }

  return http.post(apiEndpoint, order);
}

export function deleteOrder(orderId) {
  return http.delete(orderUrl(orderId));
}
