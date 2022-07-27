<template>
  <div class="content-post">
    <div v-if="!post">loading...</div>
    <div v-else>
      <h1 class="title">{{ post.title }}</h1>
      <div class="img-like">
        <LikeDislike :id="post.id" />
        <img :src="post.imageUrl" alt="" class="image" />
        <div>
          <div
            v-if="
              this.user.userId === post.userId ||
              (this.user.statut === 'admin' && this.user.userId === 1)
            "
            class="update-delete"
          >
            <button class="update" @click="updatePost">Modifier</button>
            <button class="delete" @click="deletePost">Supprimer</button>
          </div>
        </div>
      </div>
      <p class="content">{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapState } from "vuex";
import LikeDislike from "@/components/LikeDislike.vue";

export default {
  name: "postView",
  async created() {
    if (this.user.userId === -1) {
      router.push("/login");
      return;
    }
    await this.showOnePost(this.$route.params.id);
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
    ...mapState("modulePost", ["post"]),
  },
  components: { LikeDislike },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";

.content-post {
  color: $secondaire;
  max-width: 1140px;
  margin: auto;
  .title::first-letter {
    text-transform: capitalize;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .img-like {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    .image {
      max-width: 500px;
      max-height: 500px;
      object-fit: contain;
      margin-left: 1rem;
      margin-right: 1rem;
      @media screen and(max-width: 600px) {
        max-width: 250px;
      }
    }
  }
  .update-delete {
    display: flex;
    flex-direction: column;
    button {
      cursor: pointer;
      background: none;
      border: 2px solid $secondaire;
      border-radius: 20px;
      color: $secondaire;
      font-size: 1rem;
      transition: 0.3s;
      padding: 0.3rem;
      &:hover,
      &:active,
      &:focus {
        background: $fonce;
      }
    }
    .update {
      margin-bottom: 0.5rem;
    }
    @media screen and(max-width: 404px) {
      margin-top: 1rem;
    }
  }
  .content {
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
