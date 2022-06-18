import { createStore } from "vuex";
import router from "../router/index";

let user = JSON.parse(localStorage.getItem("user"));
const defaultUser = {
  userId: -1,
  token: "",
};

if (!user) {
  user = defaultUser;
}

export default createStore({
  state: {
    status: "",
    user: user,
  },
  getters: {},
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = defaultUser;
      state.status = "";
    },
    logUser(state, user) {
      state.user = user;
      router.push("/");
    },
  },
  actions: {
    // <--------------- CREATE ACCOUNT --------------->
    async createAccount({ commit, dispatch }, userInfos) {
      commit("setStatus", "loading");
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfos),
      });
      if (!response.ok) {
        console.log(
          "Network request for products.json failed with response " +
          response.status +
          ": " +
          response.statusText
        );
        commit("setStatus", "error_create");

        return;
      }
      dispatch("login", userInfos);
    },

    // <--------------- LOGIN --------------->

    async login({ commit }, userInfos) {

      commit("setStatus", "loading");
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfos),
      });
      if (!response.ok) {
        console.log(
          "Network request for products.json failed with response " +
          response.status +
          ": " +
          response.statusText
        );
        commit("setStatus", "error_loading");
        return;
      }
      // si c'est bon
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      const user = JSON.parse(localStorage.getItem("user"));
      commit("logUser", user);
    },
  },
  modules: {},
});
