<template>
  <div class="content-post">
    <InputForm
      :placeholder="post.title"
      id="title"
      label="Titre :"
      @showInput="sendTitle"
    />
    <InputForm
      :placeholder="post.content"
      id="content"
      label="Contenu :"
      @showInput="sendContent"
    />
    <InputForm label="Image :" type="file" id="image" @change="changeImage" />
    <img :src="post.imageUrl" alt="" class="image" />
    <button @click="updatePost">Modifier</button>
    <button @click="annuler">Annuler</button>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm.vue";
import router from "@/router";
import { mapActions, mapState } from "vuex";

export default {
  components: { InputForm },
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
    const id = location.href.split("/updatePost/")[1];
    const data = await this.showOnePost(id);
    this.post = data.post;
    if (this.post.userId != this.user.userId) {
      router.push("/");
    }
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
      const id = location.href.split("/updatePost/")[1];

      router.push("/post/" + id);
    },
    sendTitle(payload) {
      this.post.title = payload.value;
    },
    sendContent(payload) {
      this.post.content = payload.value;
    },
    updatePost() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      this.$store.dispatch("modulePost/updatePost", {
        title: this.post.title,
        content: this.post.content,
        userId: userId,
        image: this.post.image,
      });
    },
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
