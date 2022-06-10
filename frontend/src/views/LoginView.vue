<template>
  <div class="login-create">
    <!-- AFFICHER LOGIN OU CREATE ACCOUNT -->
    <div v-if="mode === 'login'">
      <h1>Se connecter</h1>
      <p>
        Vous n'avez pas de compte ? veuillez vous
        <a href="/#/login" @click="swithToCreateAcount()">inscrire</a> !
      </p>
    </div>
    <div v-else>
      <h1>S'inscrire</h1>
      <p>
        Vous avez déjà un compte ? veuillez vous
        <a href="/#/login" @click="swithToLogin()">connecter</a> !
      </p>
    </div>
    <!-- FORMULAIRE INSCRIPTION OR LOGIN -->
    <div class="formulaire">
      <div>
        <label for="email">Email :</label>
        <input v-model="email" type="text" id="email" />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input v-model="password" type="text" id="password" />
      </div>
      <button v-if="mode === 'login'" @click="login()">Se connecter</button>
      <button
        v-else
        @click="createAccount()"
        :class="{ 'button-disabled': !validatedFields }"
      >
        S'inscrire
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  data: () => {
    return {
      mode: "login",
      email: "",
      password: "",
    };
  },
  computed: {
    // REVOIR AVEC DU REGEX
    validatedFields() {
      if (this.mode == "create") {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  methods: {
    swithToLogin() {
      this.mode = "login";
    },
    swithToCreateAcount() {
      this.mode = "create";
    },
    createAccount() {
      this.$store.dispatch("createAccount", {
        email: this.email,
        password: this.password,
      });
    },
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    ...mapActions(["showUsers"]),
  },
};
</script>

<style lang="scss" scoped>
.formulaire {
  width: fit-content;
  margin: auto;
  text-align: justify;
  > div {
    margin-bottom: 1rem;
    label,
    input {
      display: block;
    }
  }
  button {
    display: block;
    margin: auto;
  }
  .button-disabled {
    pointer-events: none;
  }
}
</style>
