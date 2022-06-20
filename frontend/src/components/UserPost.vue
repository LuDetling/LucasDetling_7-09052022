<template>
  <div v-for="post of posts" class="card-post-like">
    <div class="like-dislike">
      <button>like</button>
      <button>dislike</button>
    </div>
    <div class="card-post">
      <img src="../assets/logo.png" alt="" />
      <div class="post">
        <h1>{{ post.title }}</h1>
        <p>Paragraph of post</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "userPost",
  data: () => {
    return {
      posts: [{ title: "", content: "" }],
    };
  },
  async mounted() {
    const response = await fetch("http://localhost:3001/posts");
    if (!response.ok) {
      console.log(
        "Network request for products.json failed with response " +
          response.status +
          ": " +
          response.statusText
      );
    }
    const data = await response.json();
    const posts = data.posts;
    // for sur posts
    this.posts.title = posts.title;
  },
};
</script>

<style lang="scss">
.card-post-like {
  display: flex;
  margin: auto;
  width: 600px;
  padding: 0.5rem;
  background: #2c3e50;
  .like-dislike {
    border-right: 1px solid white;
    padding-right: 0.5rem;
    button {
      display: block;
      cursor: pointer;
    }
  }
  .card-post {
    display: flex;
    img {
      width: 100px;
      padding: 0 0.5rem;
      border-right: 1px solid white;
    }
    .post {
      padding-left: 0.5rem;
      h1 {
        margin: 0;
        color: white;
      }
      p {
        color: white;
        margin: 0;
        text-align: start;
      }
    }
  }
}
</style>
