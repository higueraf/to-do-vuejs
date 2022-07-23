<template>
  <nav>
    <div class="nav-wrapper teal">
      <a href="#" class="brand-logo">To-Do App</a>
      <ul class="right hide-on-med-and-down">
        <li v-if="$store.state.isAuthenticated"><a href="#" >User: {{$store.state.userName}}</a></li>
        <li v-if="$store.state.isAuthenticated"><a href="#" @click="logUserOut">Logout</a></li>
      </ul>
    </div>
  </nav>
  <div class="container white" style="margin-top: 30px">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    if (!this.$store.state.isAuthenticated) {
      return this.$router.push("/login");
    }
  },
  name: "App",
  computed: {
    logUserOut() {
      this.axios.defaults.headers.common['Authorization'] = null;
      this.$store.commit('setAuthenticated', false);
      this.$store.commit('setUserName', null);
      this.$store.commit('setUserEmail', null);
      this.$store.commit('setIsAdmin', null);
      this.$router.push("/login");
    },

  },
};
</script>

<style scoped>
.user-data {
  position: fixed;
  bottom: 0px;
  left: 0px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  z-index: 2;
}
</style>
