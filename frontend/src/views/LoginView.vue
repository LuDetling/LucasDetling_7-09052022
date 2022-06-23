<template>
  <div class="login-create">
    <h1>Se connecter</h1>
    <p>
      Vous n'avez pas de compte ? veuillez vous
      <a class="signup" @click="letsSignup">inscrire</a>
    </p>
    <div class="formulaire">
      <InputForm label="Email : " name="email" type="text" :error="errorEmail" @showInput="sendEmail" />
      <InputForm label="Mot de passe : " name="password" type="password" :error="errorPassword"
        @showInput="sendPassword" />
    </div>
    <button v-if="status === ''" @click="validatedFields">Se connecter</button>
    <button v-else-if="status === 'loading'">
      Connexion en cours...
    </button>
    <div v-else>
      <button @click="validatedFields">Se connecter</button>
      <div>Email et/ou mot de passe inccorect</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import InputForm from "../components/InputForm.vue";
import router from "@/router";

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export default {
  name: "loginView",
  components: {
    InputForm,
  },
  data: () => {
    return {
      email: "",
      password: "",
      errorEmail: "",
      errorPassword: "",
    };
  },
  mounted() {
    if (this.user.userId != -1) {
      router.push("/");
    }
  },
  computed: {
    ...mapState(["status", "user"]),
  },
  methods: {
    sendEmail(payload) {
      this.email = payload.value;
    },
    sendPassword(payload) {
      this.password = payload.value;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    letsSignup() {
      this.$router.push("/signup");
    },
    validatedFields() {
      if (
        regexEmail.test(this.email) != true &&
        regexPassword.test(this.password) != true
      ) {
        this.errorEmail = "Email invalide";
        this.errorPassword = "Mot de passe invalide";
        return false;
      } else if (regexEmail.test(this.email) != true) {
        this.errorEmail = "Email invalide";
        this.errorPassword = "";
        return false;
      } else if (regexPassword.test(this.password) != true) {
        this.errorPassword = "Mot de passe invalide";
        return false;
      } else {
        this.errorEmail = "";
        this.errorPassword = "";
        this.login();
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";

.login-create {
  color: white;

  >h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  >p {
    font-size: 1.2rem;
    margin-bottom: 2rem;

    .signup {
      text-decoration: underline;
      cursor: pointer;
    }

  }

  button {
    background-color: white;
    color: $tertiaire;
    font-size: 1rem;
    padding: .5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    &:focus-visible,
    &:hover {
      outline: 3px solid green;
    }
  }
}
</style>
