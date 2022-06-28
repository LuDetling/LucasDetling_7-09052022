import router from "../router/index";

const moduleUser = {
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
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      const user = JSON.parse(localStorage.getItem("user"));
      commit("logUser", user);
      commit("setStatus", "loged");
    },
  },
};

export default moduleUser;
