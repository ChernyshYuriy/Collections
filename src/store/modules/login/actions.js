import api from "@/api/userAPI";
import axios from "axios";

// described user fields
class User {
  constructor({ objectId, username, createdAt, updatedAt, sessionToken }) {
    this.objectId = objectId;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.sessionToken = sessionToken;
  }
}

export default {
  // request create user and saving userId and sesssionToken for commit SET_NEW_USER
  async createAccount(params) {
    try {
      const resp = await axios.post(api.users, params);
      const respData = resp.data;
      respData.username = params.username;
      respData.updatedAt = respData.createdAt;
      const newUser = new User(respData);
      this.SET_NEW_USER(newUser);
    } catch (error) {
      this.SET_VALIDATION_ERROR(error.response.data.error || "");
      console.error(error);
    }
  },
  // login user and saving userId and sesssionToken for commit SET_NEW_USER
  async login(params) {
    try {
      const resp = await axios.post(api.login, params);
      const newUser = new User(resp.data);
      this.SET_NEW_USER(newUser);
    } catch (error) {
      this.SET_VALIDATION_ERROR(error.response.data.error || "");
      console.error(error);
    }
  },
  // get user data using localStorage userId
  async getCurrentUser(id) {
    try {
      const resp = await axios.get(api.getUser(id));
      const newUser = new User(resp.data);
      this.SET_NEW_USER(newUser);
    } catch (error) {
      console.error(error);
    }
  },
  async logout() {
    try {
      await axios.post(api.logout);
      this.DELETE_USER();
    } catch (error) {
      console.error(error);
    }
  },
};
