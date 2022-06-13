import { createStore } from "vuex";

let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  user = {
    token: "",
    userId: -1,
  };
}

export default createStore({
  state: {
    status: "",
    user: user,
  },
  getters: {},
  mutations: {},
  actions: {
    // CREATE ACCOUNT
    async createAccount({ context, state }, userInfos) {
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
        state.status = "invalid_email";
        return;
      }
      state.status = "";
      location.href = "/#/login";
    },
    // LOGIN
    async login({ context, state }, userInfos) {
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
        state.status = "password_invalid";
        return;
      }
      state.status = "";
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem("user"));
      location.href = "";
    },
  },
  modules: {},
});
