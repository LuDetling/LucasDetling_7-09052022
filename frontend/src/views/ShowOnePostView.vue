<template>
  <div class="content-post">
    <h1 class="title">{{ post.title }}</h1>
    <div class="img-like">
      <img :src="post.imageUrl" alt="" class="image" />
      <div class="like">
        <div>
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          {{ post.likes }}
        </div>
        <div>
          <font-awesome-icon icon="fa-solid fa-thumbs-down" />
          {{ post.dislikes }}
        </div>
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
    };
  },
  methods: {
    ...mapActions("modulePost", ["deletePost", "showOnePost"]),
    updatePost() {
      const id = location.href.split("/post/")[1];
      router.push("/updatePost/" + id);
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
    .like {
      div {
        margin-bottom: 0.5rem;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        svg {
          margin-left: 0.5rem;
          transform: rotateY(180deg);
          margin-right: 0.3rem;
          font-size: 1.5rem;
          position: relative;
        }
        .fa-thumbs-up {
          top: -5px;
        }
        .fa-thumbs-down {
          top: 2px;
        }
      }
    }
  }
}
</style>
