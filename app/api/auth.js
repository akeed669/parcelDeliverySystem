import client from "./client";

let apiEndpoint = "";

const login = (email, password,userType) => {

  if(userType.value===1){
    apiEndpoint = "/clients/login";
  }
  else if (userType.value===2){
    apiEndpoint = "/drivers/login";
  }

  return client.post(apiEndpoint, { email, password });

}

export default {
  login,
};
