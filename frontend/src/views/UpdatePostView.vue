<template>
  <div class="content-post">
    <div v-if="!post">loading...</div>
    <div class="modify-content">
      <div class="image-left">
        <img :src="post.imageUrl" alt="" class="image" />
      </div>
      <div class="input-right">
        <InputForm
          :placeholder="post.title"
          id="title"
          label="Titre :"
          @showInput="sendTitle"
          :error="errorTitle"
        />
        <div class="label-content">
          <label for="">Contenu :</label>
          <textarea
            name="content"
            id="content"
            rows="10"
            v-model="content"
            :placeholder="post.content"
            maxlength="191"
          ></textarea>
          <div class="error">{{ errorContent }}</div>
        </div>
        <InputForm
          label="Image :"
          type="file"
          id="image"
          @change="changeImage"
        />
      </div>
    </div>

    <button @click="validateFields" class="update">Modifier</button>
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
      content: "",
      errorTitle: "",
      errorContent: "",
    };
  },
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
      this.post.title = payload.value;
    },
    sendContent(payload) {
      this.post.content = payload.value;
    },
    validateFields() {
      if (this.post.title.length < 5 && this.content.length < 20) {
        this.errorTitle = "Titre trop court !";
        this.errorContent = "Content trop court !";
        return false;
      } else if (this.post.title.length < 5) {
        this.errorTitle = "Titre trop court !";
        this.errorContent = "";
        return false;
      } else if (this.content.length < 20) {
        this.errorContent = "Content trop court !";
        this.errorTitle = "";
        return false;
      } else {
        this.errorContent = "";
        this.errorTitle = "";
        this.updatePost();
        return true;
      }
    },
    updatePost() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;

      this.$store.dispatch("modulePost/updatePost", {
        title: this.post.title,
        content: this.content,
        userId: userId,
        image: this.post.image,
      });
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapState("modulePost", ["post"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";
.content-post {
  color: $secondaire;
  .modify-content {
    display: flex;
    justify-content: center;

    .image-left {
      margin-right: 2rem;
      .image {
        width: 300px;
      }
    }
    .input-right {
      .input-form {
        margin: 0;
      }
      .label-content {
        width: 300px;
        margin: auto;
        textarea {
          width: 100%;
        }
      }
      label {
        display: block;
        text-align: start;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      .error {
        margin: 0.5rem 0;
        color: yellow;
        text-align: start;
      }
    }
    @media screen and (max-width: 640px) {
      flex-direction: column;
      .image-left {
        margin: auto;
        .image {
          margin-bottom: 1rem;
        }
      }
      .input-right {
        .input-form {
          margin: auto;
        }
      }
    }
  }
  > button {
    margin-top: 2rem;
    background: none;
    color: $secondaire;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    outline: 2px solid $secondaire;
    border: none;
    transition: 0.3s;
    &:focus-visible,
    &:hover {
      background: $fonce;
    }
  }
  .update {
    margin-right: 1rem;
  }
}
</style>
