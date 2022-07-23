import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/store'
axios.defaults.baseURL = 'https://localhost:3000/api/v1';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


var token = localStorage.getItem('token');
if(token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')