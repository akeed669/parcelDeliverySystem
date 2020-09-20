import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/drivers/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const response  = await http.post(apiEndpoint, { email, password });  
  localStorage.setItem(tokenKey, response.data.fullname);
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
