import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/drivers";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    fullname: user.name,
    mobile: user.phoneNumber,
  });
}
