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
        },
    ],
});

// Add a global beforeEach guard to check if the user is authenticated for all routes
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.authenticationModule.authenticated;
    if (to.path === '/login' || to.path === '/register') {
        // Allow access to the login and register pages for unauthenticated users
        next();
    } else {
        // For other routes (including the homepage), check if the user is authenticated
        if (isAuthenticated) {
            next();
        } else {
            // If not authenticated, redirect to the login page
            next('/login');
        }
    }
});

export default router;



