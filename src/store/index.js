import { createStore } from "vuex";
import login from "./modules/login";

const store = createStore({
  modules: { login },
});

export const getStore = () => store;

export default store;
