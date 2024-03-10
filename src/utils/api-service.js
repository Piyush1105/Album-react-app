import axios from "axios";
import { toast } from "react-toastify";
import { backendBaseUrl } from "../config/config";

const ApiService = (apiConfig) => {
  apiConfig.url = `${backendBaseUrl}${apiConfig.url}`;

  return axios(apiConfig)
    .then(function (_response) {
      return new Promise((resolve) => {
        return resolve(_response.data);
      });
    })
    .catch((err) => {
      const error = err?.response?.data?.errors;
      error.map((e) => toast.error(e));
      throw err.response.data.errors;
    });
};

export default ApiService;
