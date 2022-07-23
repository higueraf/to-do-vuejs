import { createStore } from 'vuex'


export default createStore({
    state: {
        isAuthenticated: false,
        userName: '',
        userEmail: '',
        isAdmin: false,
    },
    mutations: {
        setAuthenticated(state, value) {
            console.log('setAuthenticated', value);
            state.isAuthenticated = value;
        },
        setUserName(state, value) {
            console.log('setUserName', value);
            state.userName = value;
        },
        setUserEmail(state, value) {
            console.log('setUserEmail', value);
            state.userEmail = value;
        },
        setIsAdmin(state, value) {
            console.log('setIsAdmin', value);
            state.isAdmin = value;
        }

    },
});