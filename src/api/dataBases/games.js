export const options = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  },
};

export const url = (keyword) =>
  `https://steamcommunity.com/actions/SearchApps/${keyword}`;

// `https://rawg-video-games-database.p.rapidapi.com/games/${keyword}`;
export default {
  options,
  url,
};
