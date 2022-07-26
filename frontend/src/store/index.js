import { createStore } from "vuex";
import router from "../router/index";
import modulePost from "./post";
import moduleUser from "./user";

let user = JSON.parse(localStorage.getItem("user"));
const defaultUser = {
  userId: -1,
  token: "",
};

if (!user) {
  user = defaultUser;
}

export default createStore({
  modules: {
    moduleUser,
    modulePost,
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
      const oneDaySeconds = 1000 * 60 * 60 * 24;
      setTimeout(() => {
        localStorage.removeItem("user");
        state.user = defaultUser;
        state.status = "";
        router.push("/login");
      }, oneDaySeconds);
      router.push("/");
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = defaultUser;
      state.status = "";
    },
  },
  actions: {
    resetStatus({ state }) {
      state.status = "";
    },
  },
});
