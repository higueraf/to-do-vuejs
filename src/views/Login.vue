<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="iniciarSesion">
        <div class="input-field row">
          <div class="col m3">
            <label>Email</label>
            <input type="text" v-model="email">
          </div>
        </div>
        <div class="input-field row">
          <div class="col m3">
            <label>Password</label>
            <input type="password" v-model="password">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <button v-show="!loading" type="submit" class="btn">Login<i class="material-icons right">security</i></button>
            <div v-show="loading" class="progress">
              <div class="indeterminate"></div>
          </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import M from 'materialize-css'
    export default
    {
        name: 'Login',
        data(){
          return {
            email: '',
            password: '',
            loading: false
          }
        },
        methods: {
          async iniciarSesion()
          {
            var payload = {
              email: this.email,
              password: this.password
            };
            this.loading = true;
            await this.axios.post('http://localhost:3000/api/v1/auth/login', payload, {
            headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }
            })
       
            .then(response => {
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
              localStorage.setItem('token', response.data.accessToken);
              localStorage.setItem('id', response.data.user.id);
              localStorage.setItem('name', response.data.user.name);
              localStorage.setItem('email', response.data.user.email);
              localStorage.setItem('user', response.data.user);
              this.$router.push('/');
            })
            .catch(error => {
              var data = error.response.data;
              M.toast({html: data.message});
            });
            this.loading = false;
          }
        }
    }
</script>