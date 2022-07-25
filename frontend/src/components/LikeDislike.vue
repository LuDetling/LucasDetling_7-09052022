<template>
  <div class="like-dislike">
    <button @click="addOneLike" class="like" :class="{ isLiked: isLiked }">
      <font-awesome-icon icon="fa-solid fa-thumbs-up" />
      {{ post.likes }}
    </button>
    <button
      @click="addOneDislike"
      class="dislike"
      :class="{ isDisliked: isDisliked }"
    >
      <font-awesome-icon icon="fa-solid fa-thumbs-down" />
      {{ post.dislikes }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    id: Number,
  },
  data: () => {
    return {
      post: {},
      isLiked: false,
      isDisliked: false,
      active: 2,
      like: 0,
    };
  },
  async created() {
    if (!this.id) {
      this.post = await this.updateLikeDislike(this.$route.params.id);
      this.haveLike();
      return;
    }
    this.post = await this.updateLikeDislike(this.id);
    this.haveLike();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions("modulePost", ["updateLikeDislike", "showOnePost"]),
    haveLike() {
      if (this.post.likedBy.map((x) => x.userId).includes(this.user.userId)) {
        this.isLiked = true;
      } else this.isLiked = false;
      if (
        this.post.dislikedBy.map((x) => x.userId).includes(this.user.userId)
      ) {
        this.isDisliked = true;
      } else this.isDisliked = false;
    },
    async addOneLike() {
      // récupération de la bdd
      this.haveLike();

      const response = await this.updateLikeDislike(this.id);
      this.post = response;
      const postId = this.id;
      // on regarde dans le localstorage
      const { userId } = this.user;
      // on regarde si le user a déja like
      const usersLiked = response.likedBy.map((x) => x.userId);
      const usersDisliked = response.dislikedBy.map((x) => x.userId);
      if (usersLiked.includes(userId)) {
        this.post.likes--;
        this.isLiked = false;
        this.isDisliked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 0,
          userId: userId,
          postId,
        });
      } else if (usersDisliked.includes(userId)) {
        this.post.dislikes--;
        this.post.likes++;
        this.isLiked = true;
        this.isDisliked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 1,
          userId: userId,
          postId,
        });
      } else {
        this.post.likes++;
        this.isLiked = true;
        this.isDisliked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 1,
          userId: userId,
          postId,
        });
      }
    },
    async addOneDislike() {
      // récupération de la bdd
      const response = await this.updateLikeDislike(this.id);
      this.post = response;
      const postId = this.id;
      // on regarde dans le localstorage
      const { userId } = this.user;
      // on regarde si le user a déja like<
      const usersLiked = response.likedBy.map((x) => x.userId);
      const usersDisliked = response.dislikedBy.map((x) => x.userId);
      if (usersDisliked.includes(userId)) {
        this.post.dislikes--;
        this.isDisliked = false;
        this.isLiked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 0,
          userId: userId,
          postId,
        });
      } else if (usersLiked.includes(userId)) {
        this.post.likes--;
        this.post.dislikes++;
        this.isDisliked = true;
        this.isLiked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: -1,
          userId: userId,
          postId,
        });
      } else {
        this.post.dislikes++;
        this.isDisliked = true;
        this.isLiked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: -1,
          userId: userId,
          postId,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";

.like-dislike {
  button {
    margin-bottom: 0.5rem;
    padding: 0;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    svg {
      margin-left: 0.5rem;
      margin-right: 0.3rem;
      font-size: 1.5rem;
      position: relative;
    }
  }
  .like {
    svg {
      transform: rotateY(180deg);
    }
  }
  .isLiked {
    color: green;
  }
  .isDisliked {
    color: red;
  }
}
</style>
