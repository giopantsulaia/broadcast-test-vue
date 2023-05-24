import axios from "../configs/axios/index";
const setCsrfToken = () => {
  axios.get("csrf-cookie");
};
export default setCsrfToken;
