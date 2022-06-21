<template>
  <div class="content-posts">
    <div v-for="post of posts" :key="post.id" class="card-post-like">
      <div class="like-dislike">
        <button>{{ post.likes }}</button>
        <button>{{ post.dislikes }}</button>
      </div>
      <div class="card-post">
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
    // for sur posts
    for (let i = 0; i < allPosts.length; i++) {
      this.posts.push(allPosts[i]);
      console.log(this.posts[i]);
    }
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
  margin-bottom: 2rem;
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
