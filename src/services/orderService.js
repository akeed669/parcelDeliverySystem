import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/orders";

function orderUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getOrders() {
  return http.get(apiEndpoint);
}

export function getOrder(orderId) {
  return http.get(orderUrl(orderId));
}

export function saveOrder(order) {
  if (order._id) {
    const body = { ...order };
    delete body._id;
    return http.put(orderUrl(order._id), body);
  }

  return http.post(apiEndpoint, order);
}

export function deleteOrder(orderId) {
  return http.delete(orderUrl(orderId));
}
