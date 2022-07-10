import router from "../router/index";

const modulePost = {
  namespaced: true,
  actions: {
    // <--------------- AFFICHER UN POST --------------->
    async showOnePost({ rootState }, id) {
      const { token } = rootState.user;
      const response = await fetch("http://localhost:3001/posts/" + id, {
        method: "GET",
        headers: {
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
      return response.json();
    },
    // <--------------- AFFICHER POSTS --------------->
    async showPosts({ rootState }) {
      const { token } = rootState.user;
      if (rootState.user.userId === -1) {
        return;
      }
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: {
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
      const data = await response.json();
      const allPosts = data.posts.reverse();
      return allPosts;
    },
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
    // <--------------- CREATE POST --------------->
    async likeOrDislikePost({ rootState }, likeInfos) {
      console.log(likeInfos);
      const { postId } = likeInfos;
      const { token } = rootState.user;
      const response = await fetch(
        "http://localhost:3001/posts/" + postId + "/like",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `BEARER ${token}`,
          },
          body: JSON.stringify(likeInfos),
        }
      );
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
  },
};

export default modulePost;
