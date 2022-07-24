<template>
  <div class="container">
    <div class="row valign-wrapper">
      <div class="col s10 offset-s1 valign">
        <div class="card-panel">
          <div class="card-content white-text">
            <form @submit.prevent="register">
              <div class="input-field row">
                <div class="col m12">
                  <label>Name</label>
                  <input type="text" v-model="name" />
                </div>
              </div>
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
              <div class="input-field row">
                <div class="col m12">
                  <label>Password Confirmation</label>
                  <input type="password" v-model="password_confirmation" />
                </div>
              </div>
              
              <div class="row">
                <div class="col m4">
                  <button v-show="!loading" type="submit" class="btn">
                    Sign Up<i class="material-icons right">person_add</i>
                  </button>
                  
                  <div v-show="loading" class="progress">
                    <div class="indeterminate"></div>
                  </div>
                </div>
                <div class="col m4">
                  <router-link to="/login" class="btn">Login<i class="material-icons right">security</i></router-link>
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
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.password_confirmation) {
        M.toast({ html: "Passwords do not match" });
        return;
      }
      var userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        isAdmin: false,
      };
      this.loading = true;
      await this.axios
        .post("/auth/register", userData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            M.toast({ html: "User created successfully" });
            this.$router.push("/login");
          } else {
            M.toast({ html: "Error registering user" });
          }
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
