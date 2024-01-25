export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d8cd14cecbmsha71ce9ed63e7049p1989adjsnd9ee6f433fe7",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};
export const url = (keyword) =>
  `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}`;

export default {
  options,
  url,
};
