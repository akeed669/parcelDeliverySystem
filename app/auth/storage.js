import * as SecureStore from "expo-secure-store";
// import jwtDecode from "jwt-decode";

const key = "userObj";

const storeUser = async (userObj) => {
  try {
    await SecureStore.setItemAsync(key, userObj);
  } catch (error) {
    console.log("Error storing the user object", error);
  }
};

const getUser = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the user object", error);
    return null;
  }
};

// const getUser = async () => {
//   const token = await getToken();
//   return token ? jwtDecode(token) : null;
// };

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the user object", error);
  }
};

export default { getUser, removeUser, storeUser };
