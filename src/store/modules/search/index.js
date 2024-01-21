import state from "./state";
import actions from "./actions";
import getters from "./getters";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  namespaced: true,
  state,
  actions,
  getters,
});
