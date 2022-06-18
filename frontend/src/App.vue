<template>
  <nav>
    <router-link to="/" class="accueil">Accueil</router-link>
    <router-link v-if="status === 'loged'" to="/newPost">Nouveau post</router-link>
    <div class="log">
      <router-link v-if="user.userId === -1" to="/login">Se connecter</router-link>
      <button v-else @click="lougout" class="logout">Se déconnecter</button>
      <router-link v-if="user.userId === -1" to="/signup">S'inscrire</router-link>
    </div>
    <!-- <button v-if="email != emailStorage">test</button> -->
  </nav>
  <router-view />
</template>

<script>
import { mapState } from "vuex";

const localUser = JSON.parse(localStorage.getItem("user"));

export default {
  data: () => {
    return {
      localUser: localUser,
    };
  },
  methods: {
    lougout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(["user", "status"]),
  },
};
</script>

<style lang="scss">

@import "./assets/styles/styles.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 15px 30px;
  background-color: $blue;
  border-bottom: $grey solid 1px;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: $green;
    }

    &.router-link-exact-active {
      color: $green;
      text-decoration: underline;
    }
  }

  .log {
    a {
      display: block;
      text-align: start;

      &:first-child {
        margin-bottom: .5rem;
      }
    }

    .logout {
      background: none;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
      font-family: "Avenir", Arial, Helvetica, sans-serif;
      font-weight: 600;
      padding: 0;
      transition: 0.3s;

      &:hover {
        color: $green;
      }
    }
  }
}
</style>
