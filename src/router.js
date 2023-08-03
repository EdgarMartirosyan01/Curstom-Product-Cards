import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import store from './store';

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

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.authenticationModule.authenticated;
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else {
        if (isAuthenticated) {
            next();
        } else {
            next('/login');
        }
    }
});

export default router;



