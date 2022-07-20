<template>
  <div class="content-post">
    <div v-if="!setPost">loading...</div>
    <div v-else>
      <InputForm
        :placeholder="setPost.title"
        id="title"
        label="Titre :"
        @showInput="sendTitle"
      />
      <InputForm
        :placeholder="setPost.content"
        id="content"
        label="Contenu :"
        @showInput="sendContent"
      />
      <InputForm label="Image :" type="file" id="image" @change="changeImage" />
      <img :src="setPost.imageUrl" alt="" class="image" />
      <button @click="updatePost">Modifier</button>
      <button @click="annuler">Annuler</button>
    </div>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm.vue";
import router from "@/router";
import { mapActions, mapState } from "vuex";

export default {
  components: { InputForm },
  async created() {
    if (this.user.userId === -1) {
      router.push("/login");
      return;
    }
    await this.showOnePost(this.$route.params.id);
  },
  methods: {
    ...mapActions("modulePost", ["showOnePost"]),
    changeImage(e) {
      this.post.image = e.target.files[0];
      document.querySelector(".image").src = URL.createObjectURL(
        this.post.image
      );
    },
    annuler() {
      router.push("/post/" + this.$route.params.id);
    },
    sendTitle(payload) {
      this.setPost.title = payload.value;
    },
    sendContent(payload) {
      this.setPost.content = payload.value;
    },
    updatePost() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      this.$store.dispatch("modulePost/updatePost", {
        title: this.setPost.title,
        content: this.setPost.content,
        userId: userId,
        image: this.setPost.image,
      });
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapState("modulePost", ["setPost"]),
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
