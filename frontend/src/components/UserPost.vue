<template>
  <div class="content-post">
    <div v-for="post of posts" :key="post.id" class="card-post-like">
      <div class="like-dislike">
        <button>{{ post.likes }}</button>
        <button>{{ post.dislikes }}</button>
      </div>
      <div class="card-post" @click="showPost(post.id)">
        <img :src="post.imageUrl" alt="Image du post" />
        <div class="post">
          <h1>{{ post.title }}</h1>
          <p>{{ post.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "userPost",
  data: () => {
    return {
      posts: [],
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
    const allPosts = data.posts;
    for (let i = 0; i < allPosts.length; i++) {
      this.posts.push(allPosts[i]);
    }
  },
  methods: {
    showPost(id) {
      router.push("/post/" + id);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/styles.scss";
.card-post-like:hover{
  transform: scale(1.02);
}
.card-post-like {
  display: flex;
  margin: auto;
  width: 600px;
  padding: 0.5rem;
  background: $secondaire;
  margin-bottom: 2rem;
  transition: .2s;
  .like-dislike {
    border-right: 1px solid $tertiaire;
    padding-right: 0.5rem;
    button {
      display: block;
      cursor: pointer;
    }
  }
  .card-post {
    display: flex;
    width: 100%;
    cursor: pointer;
    img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      padding: 0 0.5rem;
      border-right: 1px solid $tertiaire;
    }
    .post {
      padding-left: 0.5rem;
      flex-grow: 2;
      h1 {
        margin: 0;
        color: $tertiaire;
        text-align: start;
        font-size: 1.7rem;
        margin-bottom: 0.8rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid $tertiaire;
      }
      p {
        color: $tertiaire;
        margin: 0;
        text-align: start;
      }
    }
  }
}
</style>
