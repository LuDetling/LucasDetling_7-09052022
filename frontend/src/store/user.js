const moduleUser = {
  actions: {
    // <--------------- CREATE ACCOUNT --------------->
    async createAccount({ dispatch, commit }, userInfos) {
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
        commit("setStatus", "error_loading");
        return;
      }
      dispatch("login", userInfos);
    },

    // <--------------- LOGIN --------------->

    async login({ commit }, userInfos) {
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
      commit("logUser", data);
    },
  },
};

export default moduleUser;
