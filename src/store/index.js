import Vue from "vue";
import Vuex from "vuex";
import userStore from "@/store/modules/userStore.js";
import { createVuexPersistedState } from "vue-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      Storage: window.localStorage,
    }),
  ],
  modules: { userStore },
});
