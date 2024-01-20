import state from "./state";
import actions from "./actions";
import getters from "./getters";
import { defineStore } from "pinia";

export const useCollectionStore = defineStore("collections", {
  namespaced: true,
  state,
  actions,
  getters,
});
