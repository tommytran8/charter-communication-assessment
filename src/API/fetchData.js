import axios from "axios";

const fetchData = () => {
  return axios.get(`${window.location.origin}/data`);
};

export default fetchData;
