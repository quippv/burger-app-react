import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-ef278.firebaseio.com/",
});

export default instance;
