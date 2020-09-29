import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

let apiEndpoint = apiUrl;
const tokenKey = "token";

export async function login(email, password,uType) {

  let accountType="";

  //check type of user and decide route endpoint
  if(uType==="customer"){
    apiEndpoint += "/clients/login";
    accountType=uType;
  }
  else if (uType==="driver"){
    apiEndpoint += "/drivers/login";
    accountType=uType;
  }

  // post the data from login form to api endpoint
  const response  = await http.post(apiEndpoint, { email, password });
  // get the user type from the response object
  response.data.accountType=accountType
  // set the data received from the server into local storage
  localStorage.setItem(tokenKey, JSON.stringify(response.data));
}

export function loginWithJwt(userObject) {
  // setting user object received as parameter in local storage
  localStorage.setItem(tokenKey, JSON.stringify(userObject));
}

export function logout(user) {
  // remove the user object from local storage when logging out
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    //retrieve the user object from local storage
    const jwt = localStorage.getItem(tokenKey);

    return jwt;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
