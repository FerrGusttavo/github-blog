import axios from "axios";

export const githubAPI = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
