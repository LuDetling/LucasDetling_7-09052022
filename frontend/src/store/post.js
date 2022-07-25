import router from "../router/index";

const modulePost = {
  namespaced: true,
  state: {
    posts: [],
    post: {},
    liked: false,
    disliked: false,
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.post = post;
    },
    updatePost(state, post) {
      state.posts = state.posts.map((item) => {
        if (item.id == post.id) {
          return post;
        }
        return item;
      });
    },
    deletePost(state, id) {
      state.posts = state.posts.filter((item) => item.id != id);
    },
  },
  actions: {
    // <--------------- AFFICHER UN POST --------------->
    async showOnePost({ rootState, commit }, postId) {
      const { token } = rootState.user;
      const response = await fetch("http://localhost:3001/posts/" + postId, {
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
      const { post } = await response.json();
      commit("setPost", post);
    },
    // <--------------- UPDATE LIKE DISLIKE --------------->
    async updateLikeDislike({ rootState, commit }, id) {
      const { token, userId } = rootState.user;
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
      const { post } = await response.json();
      return post;
    },
    // <--------------- AFFICHER POSTS --------------->
    async showPosts({ rootState, commit }) {
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
      const { posts } = await response.json();
      commit("setPosts", posts);
    },
    // <--------------- DELETE POST --------------->
    async deletePost({ rootState, commit }) {
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
      commit("deletePost", id);
      router.push("/");
    },
    // <--------------- UPDATE POST --------------->
    async updatePost({ rootState, commit }, postInfos) {
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
      const post = await response.json();
      commit("updatePost", post);
      router.push("/post/" + id);
    },
    // <--------------- CREATE POST --------------->
    async createPost({ rootState }, postInfos) {
      const formData = new FormData();
      formData.append("title", postInfos.title);
      formData.append("content", postInfos.content);
      formData.append("user", postInfos.userId);
      formData.append("image", postInfos.image);

      const { token } = rootState.user;
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
        return;
      }
      router.push("/");
    },
    // <--------------- CREATE POST --------------->
    async likeOrDislikePost({ rootState }, likeInfos) {
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
