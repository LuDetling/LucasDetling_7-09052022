<template>
  <div class="login-create">
    <h1>Se connecter</h1>
    <p>
      Vous n'avez pas de compte ? veuillez vous
      <a class="signup" @click="letsSignup">inscrire</a>
    </p>
    <form action="">
      <div class="formulaire">
        <InputForm
          label="Email : "
          name="email"
          type="text"
          :error="errorEmail"
          @showInput="sendEmail"
        />
        <InputForm
          label="Mot de passe : "
          name="password"
          type="password"
          :error="errorPassword"
          @showInput="sendPassword"
        />
      </div>
      <button v-if="status === ''" @click="validatedFields">
        Se connecter
      </button>
      <button v-else-if="status === 'loading'">Connexion en cours...</button>
      <div v-else>
        <button @click="validatedFields">Se connecter</button>
        <div class="failed">Email et/ou mot de passe inccorect</div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
  created() {
    this.resetStatus();
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
    ...mapActions(["resetStatus"]),
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
      this.resetStatus();
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
        this.errorEmail = "";
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
  color: $secondaire;

  > h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  > p {
    font-size: 1.2rem;
    margin-bottom: 2rem;

    .signup {
      text-decoration: underline;
      cursor: pointer;
    }
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
  .failed {
    margin-top: 1rem;
  }
}
</style>
