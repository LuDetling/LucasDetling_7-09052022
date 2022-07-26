<template>
  <form class="new-post" enctype="multipart/form-data" id="new-post">
    <InputForm
      name="title"
      label="Titre :"
      type="text"
      @showInput="sendTitle"
      :error="errorTitle"
    />
    <label for="content">Contenu :</label>
    <textarea
      name="content"
      id="content"
      cols="100"
      rows="10"
      v-model="content"
      maxlength="191"
    ></textarea>
    <div class="error">{{ errorContent }}</div>
    <input
      type="file"
      name="image"
      @change="addImage"
      class="input-image"
      id="imageInp"
    />
    <img id="image" alt="" />
    <div class="error">{{ errorImage }}</div>
    <button @click="validateFields">Créer un post</button>
  </form>
</template>
<script>
import InputForm from "@/components/InputForm.vue";
import { mapState } from "vuex";
import router from "@/router";

const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "createPost",
  components: { InputForm },
  data: () => {
    return {
      title: "",
      content: "",
      image: null,
      errorTitle: "",
      errorContent: "",
      errorImage: "",
    };
  },
  mounted() {
    if (this.user.userId === -1) {
      router.push("/");
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    validateFields(e) {
      e.preventDefault();
      if (this.title.length < 5 && this.content.length < 20 && !this.image) {
        this.errorTitle = "Le titre est trop court !";
        this.errorContent = "Le contenu est trop court !";
        this.errorImage = "Il faut rajouter une image !";
        return false;
      } else if (this.title.length < 5 && this.content.length < 20) {
        this.errorTitle = "Le titre est trop court !";
        this.errorContent = "Le contenu est trop court !";
        this.errorImage = "";
        return false;
      } else if (this.title.length < 5 && !this.image) {
        this.errorTitle = "Le titre est trop court !";
        this.errorImage = "Il faut rajouter une image !";
        this.errorContent = "";
        return false;
      } else if (this.content.length < 20 && !this.image) {
        this.errorContent = "Le contenu est trop court !";
        this.errorImage = "Il faut rajouter une image !";
        this.errorTitle = "";
        return false;
      } else if (this.title.length < 5) {
        this.errorTitle = "Le titre est trop court !";
        this.errorContent = "";
        this.errorImage = "";
        return false;
      } else if (this.content.length < 20) {
        this.errorContent = "Le contenu est trop court !";
        this.errorImage = "";
        this.errorTitle = "";
        return false;
      } else if (!this.image) {
        this.errorImage = "Il faut rajouter une image !";
        this.errorContent = "";
        this.errorTitle = "";
        return false;
      } else {
        this.errorImage = "";
        this.errorTitle = "";
        this.errorContent = "";
        this.createPost();
        return true;
      }
    },
    createPost() {
      this.$store.dispatch("modulePost/createPost", {
        title: this.title,
        content: this.content,
        userId: user.userId,
        image: this.image,
      });
    },
    sendTitle(payload) {
      this.title = payload.value;
    },
    addImage(e) {
      this.image = e.target.files[0];
      document.querySelector("#image").src = URL.createObjectURL(this.image);
    },
    checkForm(e) {
      e.preventDefault();
      this.createPost();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";
#new-post {
  width: fit-content;
  margin: auto;
  text-align: justify;
  margin-bottom: 1rem;
  color: $secondaire;
  label,
  button {
    display: block;
    margin: auto;
  }
  .error {
    margin-bottom: .5rem;
    color: yellow;
  }
  button {
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
  textarea {
    margin-bottom: .5rem;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .input-image {
    display: block;
    margin-bottom: .5rem;
  }
  #image {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
  }
}
</style>
