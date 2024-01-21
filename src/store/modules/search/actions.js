import api from "@/api/dataBases/movies";

export default {
  async searchFilmTitle(keyword) {
    try {
      const response = await fetch(api.movies.url(keyword), api.movies.options);
      const data = await response.json();
      this.SET_SEARCH_RESULTS(data.results);
    } catch (error) {
      console.error(error);
    }
  },
};
