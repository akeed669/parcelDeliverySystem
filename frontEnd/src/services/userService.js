import http from "./httpService";
import { apiUrl } from "../config.json";

// endpoint for registering clients
let apiEndpoint = apiUrl;

export function register(user) {

  //check type of user and decide route endpoint
  if(user.uType==="customer"){
    apiEndpoint += "/clients";
  }
  else if (user.uType==="driver"){
    apiEndpoint += "/drivers";
  }

  // post the data from register form to api endpoint
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    fullname: user.name,
    mobile: user.phoneNumber,
  });
}
