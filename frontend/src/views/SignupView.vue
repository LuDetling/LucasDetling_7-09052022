<template>
  <div class="login-create">
    <h1>S'inscrire</h1>
    <p>
      Vous avez déjà un compte ? veuillez vous
      <a class="login" @click="letsLogin">connecter</a>
    </p>
    <div class="formulaire">
      <InputForm name="email" label="Email : " type="text" :error="errorEmail" @showInput="sendEmail" />
      <InputForm name="password" label="Mot de passe : " type="password" :error="errorPassword"
        @showInput="sendPassword" />
    </div>
    <button v-if="status === ''" @click="validatedFields">S'inscrire</button>
    <button v-else-if="status === 'loading'">
      Inscription en cours...
    </button>
    <div v-else>
      <button @click="validatedFields">Inscription</button>
      <div>Email déjà utilisé</div>
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
  name: "signup",
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
  methods: {
    sendEmail(payload) {
      this.email = payload.value;
    },
    sendPassword(payload) {
      this.password = payload.value;
    },
    createAccount() {
      this.$store.dispatch("createAccount", {
        email: this.email,
        password: this.password,
      });
    },
    letsLogin() {
      this.$router.push("/login");
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
        this.createAccount();
        return true;
      }
    },
  },
  computed: {
    ...mapState(["status", "user"]),
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

    .login {
      text-decoration: underline;
      cursor: pointer;
    }

  }

  button {
    background-color: white;
    color: $darkblue;
    font-size: 1rem;
    padding: .5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    border: none;

    &:focus-visible,
    &:hover {
      outline: 3px solid $green;
    }
  }
}
</style>
