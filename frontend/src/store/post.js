import router from "../router/index";

const modulePost = {
  namespaced: true,
  actions: {
    // <--------------- DELETE POST --------------->
    async deletePost({ rootState }) {
      const { token } = rootState.user;
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
    async updatePost({ rootState }, postInfos) {
      const formData = new FormData();
      formData.append("title", postInfos.title);
      formData.append("content", postInfos.content);
      formData.append("user", postInfos.userId);
      formData.append("image", postInfos.image);

      const { token } = rootState.user;
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
    async createPost({ commit, rootState }, postInfos) {
      const formData = new FormData();
      formData.append("title", postInfos.title);
      formData.append("content", postInfos.content);
      formData.append("user", postInfos.userId);
      formData.append("image", postInfos.image);

      const { token } = rootState.user;
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

export default modulePost;
