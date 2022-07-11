<template>
  <div class="content-post">
    <div v-for="post of posts" :key="post.id" class="card-post-like">
      <LikeDislike :id="post.id" />
      <div class="card-post" @click="goShowOnePost(post.id)">
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
import { mapActions, mapState } from "vuex";
import LikeDislike from "./LikeDislike.vue";

export default {
  name: "userPost",
  components: LikeDislike,
  data: () => {
    return {
      posts: [],
    };
  },
  async created() {
    if (this.user.userId === -1) {
      router.push("/login");
      return;
    }
    const allPosts = await this.showPosts();
    for (let i = 0; i < allPosts.length; i++) {
      this.posts.push(allPosts[i]);
    }
  },
  methods: {
    goShowOnePost(id) {
      router.push("/post/" + id);
    },
    ...mapActions("modulePost", ["showPosts", "showOnePost"]),
  },
  computed: {
    ...mapState(["user"]),
  },
  components: { LikeDislike },
};
</script>

<style lang="scss">
@import "../assets/styles/styles.scss";
.card-post-like:hover {
  transform: scale(1.02);
}
.card-post-like {
  display: flex;
  margin: auto;
  width: 600px;
  padding: 0.5rem;
  background: $secondaire;
  margin-bottom: 2rem;
  transition: 0.2s;
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
