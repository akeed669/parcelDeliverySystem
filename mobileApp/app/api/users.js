// import client from "./client";
//
// const register = (userInfo) => client.post("/users", userInfo);
//
// export default { register };



import client from "./client";

let apiEndpoint = "";

const register = (userInfo) => {

  if(userInfo.userType.value===1){
    apiEndpoint = "/clients";
  }
  else if (userInfo.userType.value===2){
    apiEndpoint = "/drivers";
  }

  return client.post(apiEndpoint, {
    email: userInfo.email,
    password: userInfo.password,
    fullname: userInfo.name,
    mobile: userInfo.phone,});
  }

  export default { register };
