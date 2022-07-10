<template>
  <div class="content-post">
    <h1 class="title">{{ post.title }}</h1>
    <div class="img-like">
      <img :src="post.imageUrl" alt="" class="image" />
      <div class="like-dislike">
        <button
          @click="addOneLike(post)"
          class="like"
          :class="{ isLiked: isLiked }"
        >
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          {{ post.likes }}
        </button>
        <button
          @click="addOneDislike(post)"
          class="dislike"
          :class="{ isDisliked: isDisliked }"
        >
          <font-awesome-icon icon="fa-solid fa-thumbs-down" />
          {{ post.dislikes }}
        </button>
      </div>
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

export default {
  name: "postView",
  data: () => {
    return {
      post: [],
      isLiked: false,
      isDisliked: false,
    };
  },
  methods: {
    ...mapActions("modulePost", ["deletePost", "showOnePost"]),
    updatePost() {
      const id = location.href.split("/post/")[1];
      router.push("/updatePost/" + id);
    },
    async addOneLike(post) {
      // si il y a deja un like on retire un like
      // si il y a deja un dislike on retire un dislike
      // a chaque fin de click il faut récupérer si userId est dans usersliked
      const postId = post.id;
      const localParse = JSON.parse(localStorage.getItem("user"));
      const userId = localParse.userId;
      const response = await this.showOnePost(postId);
      // si user id a déja un like sur ce post on enleve
      const usersLiked = response.post.likedBy.map((x) => x.userId);
      const usersDisliked = response.post.dislikedBy.map((x) => x.userId);
      if (usersLiked.includes(userId)) {
        post.likes--;
        this.isLiked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 0,
          userId: userId,
          postId,
        });
      } else if (usersDisliked.includes(userId)) {
        post.dislikes--;
        post.likes++;
        this.isLiked = true;
        this.isDisliked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 1,
          userId: userId,
          postId,
        });
      } else {
        post.likes++;
        this.isLiked = true;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 1,
          userId: userId,
          postId,
        });
      }
    },
    async addOneDislike(post) {
      const postId = post.id;
      const localParse = JSON.parse(localStorage.getItem("user"));
      const userId = localParse.userId;
      const response = await this.showOnePost(postId);
      // si user id a déja un like sur ce post on enleve
      const usersLiked = response.post.likedBy.map((x) => x.userId);
      const usersDisliked = response.post.dislikedBy.map((x) => x.userId);
      if (usersDisliked.includes(userId)) {
        post.dislikes--;
        this.isDisliked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 0,
          userId: userId,
          postId,
        });
      } else if (usersLiked.includes(userId)) {
        post.likes--;
        post.dislikes++;
        this.isDisliked = true;
        this.isLiked = false;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: -1,
          userId: userId,
          postId,
        });
      } else {
        post.dislikes++;
        this.isDisliked = true;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: -1,
          userId: userId,
          postId,
        });
      }
    },
  },
  async created() {
    if (this.user.userId === -1) {
      router.push("/login");
      return;
    }
    const id = location.href.split("/post/")[1];
    const data = await this.showOnePost(id);
    this.post = data.post;

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
  computed: {
    ...mapState(["user"]),
  },
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
    .like-dislike {
      button {
        margin-bottom: 0.5rem;
        padding: 0;
        background: none;
        border: none;
        color: $secondaire;
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
  }
}
</style>
