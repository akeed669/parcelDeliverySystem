import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {

  // intercept http errors during api calls
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

 // show error message if errors caught are unexpected
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured.");
  }
  return Promise.reject(error);
});

// exporting the http request methods from axios library
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
