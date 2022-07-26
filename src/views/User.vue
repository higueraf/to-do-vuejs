<template>
  <h3>User</h3>
  <div class="row">
    <div class="progress">
      <div class="indeterminate" v-show="loading"></div>
    </div>
    <table class="table bordered striped" v-show="!loading">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      users: [],
      newuser: "",
      loading: false,
      current_page: 1,
      pages: 1,
    };
  },
  async mounted() {
    this.loading = true;
    const response = await this.axios.get("users").then((response) => {
      this.users = response.data;
      this.pages = response.data.last_page;
      this.loading = false;
    }).catch((error) => {
      if (error.response.status) this.$router.push("/login");
    });
    this.users = response.data;
    this.loading = false;
  },
};
</script>
