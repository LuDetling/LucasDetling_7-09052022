<template>
  <form
    class="new-post"
    enctype="multipart/form-data"
    @submit="checkForm"
    id="new-post"
  >
    <InputForm
      name="title"
      label="Titre :"
      type="text"
      @showInput="sendTitle"
    />
    <label for="content">Contenu :</label>
    <textarea
      name="content"
      id="content"
      cols="100"
      rows="10"
      v-model="content"
    ></textarea>
    <input
      type="file"
      name="image"
      @change="addImage"
      class="input-image"
      id="imageInp"
    />
    <img id="image" alt="" />
    <button type="submit">Créer un post</button>
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
.new-post {
  width: fit-content;
  margin: auto;
  text-align: justify;
  margin-bottom: 1rem;
  color: white;
  label,
  button {
    display: block;
    margin: auto;
  }

  button {
    background-color: white;
    color: $tertiaire;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    &:focus-visible,
    &:hover {
      outline: 3px solid green;
    }
  }
  textarea {
    margin-bottom: 1rem;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  .input-image {
    display: block;
  }
  #image {
    margin: 1rem 0;
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
  }
}
</style>
