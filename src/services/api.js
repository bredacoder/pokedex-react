import axios from 'axios'

const api = axios.create({
  baseURL: "https://pokeapi.co",
});
export default api;