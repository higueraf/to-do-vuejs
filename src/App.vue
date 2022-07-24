<template>
  <nav>
    <div class="nav-wrapper teal">
      <router-link  class="brand-logo" to="/">To-Do App</router-link>
      <ul class="right hide-on-med-and-down">
        <li v-if="$store.state.isAuthenticated"><router-link to="/">Home</router-link></li>
        <li v-if="$store.state.isAdmin"><router-link to="/todo">Users</router-link></li>
        <li v-if="$store.state.isAuthenticated"><router-link to="/todo">To-Do</router-link></li>
        <li v-if="$store.state.isAuthenticated">
          <a href="#">User: {{ $store.state.userName }}</a>
        </li>
        <li v-if="$store.state.isAuthenticated">
          <a href="#" @click="this.$store.commit('logout')">Logout</a>
        </li>
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
