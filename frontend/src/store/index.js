import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
  },
  getters: {},
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    // RECUPERATIONS DES API POST
    async createAccount({ context }, userInfos) {
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
        return;
      }
    },
    async login({ context }, userInfos) {
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
        return;
      }
      localStorage.setItem("login", userInfos.email);
      document.location.href="#";
    },
  },
  modules: {},
});
