import apiMovies from "@/api/dataBases/movies";
import apiGames from "@/api/dataBases/games";
export default {
  async searchFilmTitle(keyword) {
    try {
      const response = await fetch(apiMovies.url(keyword), apiMovies.options);
      const data = await response.json();
      this.SET_SEARCH_RESULTS(data.results);
    } catch (error) {
      console.error(error);
    }
  },
  async searchGamesTitle(keyword) {
    try {
      const response = await fetch(apiGames.url(keyword), apiGames.options);
      const data = await response.json();
      this.SET_SEARCH_RESULTS(data.results);
    } catch (error) {
      console.error(error);
    }
  },
};
