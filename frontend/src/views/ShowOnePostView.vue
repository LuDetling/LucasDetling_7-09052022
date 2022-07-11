<template>
  <div class="content-post">
    <h1 class="title">{{ post.title }}</h1>
    <div class="img-like">
      <img :src="post.imageUrl" alt="" class="image" />
      <LikeDislike :id="post.id" />
    </div>
    <p class="content">{{ post.content }}</p>
    <div v-if="this.user.userId === post.userId">
      <button class="delete" @click="deletePost">Supprimer</button>
      <button class="update" @click="updatePost">Modifier</button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapState } from "vuex";
import LikeDislike from "@/components/LikeDislike.vue";

export default {
  name: "postView",
  data: () => {
    return {
      post: [],
    };
  },
  async created() {
    if (this.user.userId === -1) {
      router.push("/login");
      return;
    }
    const id = location.href.split("/post/")[1];
    const response = await this.showOnePost(id);
    this.post = response.post;
    const localParse = JSON.parse(localStorage.getItem("user"));
    const userId = localParse.userId;
    const usersLiked = this.post.likedBy.map((x) => x.userId);
    const usersDisliked = this.post.dislikedBy.map((x) => x.userId);
    if (usersLiked.includes(userId)) {
      this.isLiked = true;
    } else if (usersDisliked.includes(userId)) {
      this.isDisliked = true;
    }
    if (!this.post) {
      router.push("/");
    }
  },
  methods: {
    ...mapActions("modulePost", ["deletePost", "showOnePost"]),
    updatePost() {
      const id = location.href.split("/post/")[1];
      router.push("/updatePost/" + id);
    },
  },

  computed: {
    ...mapState(["user"]),
  },
  components: { LikeDislike },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";

.content-post {
  color: $secondaire;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .img-like {
    display: flex;
    justify-content: center;
    margin-left: 22px;
    margin-bottom: 1rem;
    .image {
      max-width: 500px;
      max-height: 500px;
      object-fit: cover;
    }
  }
}
</style>
