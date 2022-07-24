<template>
  <div class="container">
    <div class="row valign-wrapper">
      <div class="col s10 offset-s1 valign">
        <div class="card-panel">
          <div class="card-content white-text">
            <form @submit.prevent="login">
              <div class="input-field row">
                <div class="col m12">
                  <label>Email</label>
                  <input type="text" v-model="email" />
                </div>
              </div>
              <div class="input-field row">
                <div class="col m12">
                  <label>Password</label>
                  <input type="password" v-model="password" />
                </div>
              </div>
              <div class="row">
                <div class="col m6">
                  <button v-show="!loading" type="submit" class="btn">
                    Login<i class="material-icons right">security</i>
                  </button>
                  <div v-show="loading" class="progress">
                    <div class="indeterminate"></div>
                  </div>
                </div>
                <div class="col m6">
                  <router-link to="/register" class="btn"
                    >Sign Up<i class="material-icons right"
                      >add_person</i
                    ></router-link
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      var payload = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      await this.axios
        .post("auth/login", payload)
        .then((response) => {
          this.axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.accessToken;
          this.$store.commit("setAuthenticated", true);
          this.$store.commit("setUserName", response.data.user.name);
          this.$store.commit("setUserEmail", response.data.user.email);
          this.$store.commit("setIsAdmin", response.data.user.isAdmin);
          this.$router.push("/");
        })
        .catch((error) => {
          var data = error.response.data.error;
          M.toast({ html: data.message });
        });
      this.loading = false;
    },
  },
};
</script>
