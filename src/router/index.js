import {createWebHistory, createRouter} from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import ToDo from '@/views/ToDo.vue'
import User from '@/views/User.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/todo',
        name: 'ToDo',
        component: ToDo
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;