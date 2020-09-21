import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (userObj) => {
    //const user = jwtDecode(authToken);
    setUser(userObj);
    authStorage.storeUser(userObj);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeUser();
  };

  return { user, logIn, logOut };
};
