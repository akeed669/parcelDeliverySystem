import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

let apiEndpoint = apiUrl;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password, uType) {
  console.log("her")
  if(uType==="customer"){
    apiEndpoint += "/clients/login";
  }
  else if (uType==="driver"){
    apiEndpoint += "/drivers/login";
  }

  const response  = await http.post(apiEndpoint, { email, password });
  //console.log(JSON.stringify(response.data))
  localStorage.setItem(tokenKey, response.data);
}

export function loginWithJwt(userObject) {
  localStorage.setItem(tokenKey, userObject);
}

export function logout(user) {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);

    //return jwtDecode(jwt);
    return jwt;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
