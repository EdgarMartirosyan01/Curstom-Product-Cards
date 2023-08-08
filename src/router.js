import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import store from './store';
import HomePage2 from "@/components/SecondHomeComponents/HomePage2";

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
        {
            path: '/home2',
            component: HomePage2,
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