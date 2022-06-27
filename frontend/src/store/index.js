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

const modulePost = {
  namespaced: true,
  state: {
    user: user,
  },
  actions: {
    // <--------------- DELETE POST --------------->
    async deletePost({ state }) {
      const { token } = state.user;
      const id = location.href.split("/post/")[1];
      const response = await fetch("http://localhost:3001/posts/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `BEARER ${token}`,
        },
      });
      if (!response.ok) {
        console.log(
          "Network request for products.json failed with response " +
            response.status +
            ": " +
            response.statusText
        );
      }
      router.push("/");
    },
    // <--------------- UPDATE POST --------------->
    async updatePost({ state }, postInfos) {
      const formData = new FormData();
      formData.append("title", postInfos.title);
      formData.append("content", postInfos.content);
      formData.append("user", postInfos.userId);
      formData.append("image", postInfos.image);

      const { token } = state.user;
      const id = location.href.split("/updatePost/")[1];

      const response = await fetch("http://localhost:3001/posts/" + id, {
        method: "PUT",
        headers: {
          authorization: `BEARER ${token}`,
        },
        body: formData,
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
      router.push("/post/" + id);
    },
    // <--------------- CREATE POST --------------->
    async createPost({ commit, state }, postInfos) {
      const formData = new FormData();
      formData.append("title", postInfos.title);
      formData.append("content", postInfos.content);
      formData.append("user", postInfos.userId);
      formData.append("image", postInfos.image);

      const { token } = state.user;
      commit("setStatus", "loading");
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          authorization: `BEARER ${token}`,
        },
        body: formData,
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
      router.push("/");
    },
  },
};

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

export default createStore({
  modules: {
    moduleUser: moduleUser,
    modulePost: modulePost,
  },
  state: {
    status: "",
    user: user,
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      state.user = user;
      router.push("/");
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = defaultUser;
      state.status = "";
    },
  },
});
