<template>
  <div class="home">
    <UserPost />
  </div>
</template>

<script>
// @ is an alias to /src
import UserPost from "@/components/UserPost.vue";

export default {
  name: "HomeView",
  components: {
    UserPost,
  },
};
</script>
