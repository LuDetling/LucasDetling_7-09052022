<template>
  <div>
    <nav class="nav">
      <router-link to="/" class="accueil"
        ><img
          src="./assets/icon-left-font-monochrome-white.svg"
          alt="Logo groupomania"
          class="logo"
      /></router-link>
      <router-link v-if="user.userId != -1" to="/newPost"
        >Nouveau post</router-link
      >
      <div class="log">
        <router-link v-if="user.userId === -1" to="/login"
          >Se connecter</router-link
        >
        <button v-else @click="lougout" class="logout">Se déconnecter</button>
        <router-link v-if="user.userId === -1" to="/signup"
          >S'inscrire</router-link
        >
      </div>
    </nav>
    <router-view />
    <footer class="footer">
      Copyright © 2022 groupomania. All Rights Reserved
    </footer>
  </div>
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
  font-family: "Lato", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
button {
  font-family: "Lato", Avenir, Helvetica, Arial, sans-serif;
}

.nav {
  padding: 15px 30px;
  background-color: $fonce;
  box-shadow: 0px 2px 7px 0px $secondaire;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  flex-wrap: wrap;
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    transition: 0.3s;
    width: 200px;
    @media screen and (max-width: 659px) {
      margin-bottom: 0.5rem;
    }
    &:hover {
      color: $secondaire;
    }

    &.router-link-exact-active {
      color: $secondaire;
      text-decoration: underline;
    }
  }
  .logo {
    width: 200px;
    @media screen and (max-width: 612px) {
      width: 150px;
    }
  }
  .log {
    a {
      display: block;
      text-align: start;
      width: fit-content;
      &:first-child {
        margin-bottom: 0.5rem;
      }
    }

    .logout {
      width: 200px;

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
        color: $secondaire;
      }
    }
  }
}
.footer {
  margin-top: 5rem;
  color: white;
  padding: 1rem;
  display: block;
}
</style>
