import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import store from './store'; // Import the Vuex store

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: LoginPage,
        },
        {
            path: '/register',
            component: RegisterPage,
        },
        {
            path: '/',
            component: HomePage,
            // Add the beforeEnter guard to check if the user is authenticated
            beforeEnter: (to, from, next) => {
                const isAuthenticated = store.state.authenticationModule.authenticated; // Access the authenticated state from the Vuex store
                if (isAuthenticated) {
                    next();
                } else {
                    // If not authenticated, redirect to the login page
                    next('/login');
                }
            },
        },
    ],
});

export default router;


