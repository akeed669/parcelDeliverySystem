import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/parcels";

function orderUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getOrders() {
  return http.get(apiEndpoint);
}

export function getOrder(orderId) {
  console.log(orderUrl(orderId));
  const tit=http.get(orderUrl(orderId));
  console.log(tit);
  return tit;
}

export function saveOrder(order) {
  if (order.id) {
    const body = { ...order };
    delete body.id;
    return http.put(orderUrl(order.id), body);
  }

  return http.post(apiEndpoint, order);
}

export function deleteOrder(orderId) {
  return http.delete(orderUrl(orderId));
}
