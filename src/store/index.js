import { createStore } from "vuex";
import login from "./modules/login";
import collection from "./modules/collections";

const store = createStore({
  modules: { login, collection },
});

export const getStore = () => store;

export default store;
