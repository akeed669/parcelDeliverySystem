import http from "./httpService";
import { apiUrl } from "../config.json";

let apiEndpoint = apiUrl;

export function register(user) {
  if(user.uType==="customer"){
    apiEndpoint += "/clients";
  }
  else if (user.uType==="driver"){
    apiEndpoint += "/drivers";
  }
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    fullname: user.name,
    mobile: user.phoneNumber,
  });
}
