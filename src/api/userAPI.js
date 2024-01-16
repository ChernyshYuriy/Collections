// variables for requests
export default {
  users: "/users",
  login: "/login",
  logout: "/logout",
  getUser: (userId) => `users/${userId}`,
};
