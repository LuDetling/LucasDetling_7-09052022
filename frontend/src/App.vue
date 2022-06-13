<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/about">A propos</router-link> |
    <router-link v-if="user.userId === -1" to="/login"
      >Se connecter</router-link
    >
    <button v-else @click="disconnected">Se déconnecter</button>
    <!-- <button v-if="email != emailStorage">test</button> -->
  </nav>
  <router-view />
</template>

<script>
import { mapState } from "vuex";

// const localUser = JSON.parse(localStorage.getItem("user"));
const localUser = JSON.parse(localStorage.getItem("user"));

export default {
  data: () => {
    return {
      localUser: localUser,
    };
  },
  computed: {
    ...mapState(["user"]),
    disconnected() {
      localStorage.removeItem("user");
      location.href = "";
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
