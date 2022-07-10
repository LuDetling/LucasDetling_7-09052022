<template>
  <div class="content-post">
    <div v-for="post of posts" :key="post.id" class="card-post-like">
      <div class="like-dislike">
        <button @click="addOneLike(post)">
          {{ post.likes }}
        </button>
        <button @click="addOneDislike(post)">{{ post.dislikes }}</button>
      </div>
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

export default {
  name: "userPost",
  data: () => {
    return {
      posts: [],
      like: 0,
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
    // peut etre faire un component, a reflechir
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
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 0,
          userId: userId,
          postId,
        });
      } else if (usersDisliked.includes(userId)) {
        post.dislikes--;
        post.likes++;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 1,
          userId: userId,
          postId,
        });
      } else {
        post.likes++;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 1,
          userId: userId,
          postId,
        });
      }
    },
    async addOneDislike(post) {
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
      if (usersDisliked.includes(userId)) {
        post.dislikes--;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: 0,
          userId: userId,
          postId,
        });
      } else if (usersLiked.includes(userId)) {
        post.likes--;
        post.dislikes++;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: -1,
          userId: userId,
          postId,
        });
      } else {
        post.dislikes++;
        this.$store.dispatch("modulePost/likeOrDislikePost", {
          like: -1,
          userId: userId,
          postId,
        });
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
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
