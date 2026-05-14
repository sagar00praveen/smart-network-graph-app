import axios from "axios";

export const getRecommendations = (name) => {
  return axios.get(`http://localhost:5000/api/recommend/${name}`);
};