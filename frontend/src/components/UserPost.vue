<template>
  <div class="content-post">
    <div v-for="post of this.posts" :key="post.id" class="card-post-like">
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
  components: { LikeDislike },
  async created() {
    if (this.user.userId === -1) {
      router.push("/login");
      return;
    }
    await this.showPosts();
  },
  methods: {
    async goShowOnePost(id) {
      await this.showOnePost(id);
      router.push("/post/" + id);
    },
    ...mapActions("modulePost", ["showPosts", "showOnePost"]),
  },
  computed: {
    ...mapState(["user"]),
    ...mapState("modulePost", ["posts"]),
  },
};
</script>

<style lang="scss">
@import "../assets/styles/styles.scss";
.card-post-like:hover {
  transform: scale(1.02);
  border-radius: 0;
}
.card-post-like {
  display: flex;
  margin: auto;
  width: 600px;
  padding: 1rem;
  background: $fonce;
  margin-bottom: 2rem;
  transition: 0.2s;
  border-radius: 10px;
  .like-dislike {
    border-right: 1px solid $secondaire;
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
      min-width: 150px;
      height: 150px;
      object-fit: cover;
      padding: 0 0.5rem;
      border-right: 1px solid $secondaire;
    }
    .post {
      padding-left: 0.5rem;
      flex-grow: 2;
      h1 {
        margin: 0;
        color: $secondaire;
        text-align: start;
        font-size: 1.7rem;
        margin-bottom: 0.8rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid $secondaire;
        &::first-letter {
          text-transform: capitalize;
        }
      }
      p {
        color: $secondaire;
        margin: 0;
        text-align: start;
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
