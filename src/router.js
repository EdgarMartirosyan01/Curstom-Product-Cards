import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/components/HomePage.vue";

const router = createRouter({
    history: createWebHistory(),
    mode: history,
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: () =>
                import('@/components/LoginPage.vue')},
        { path: '/register', component: () =>
                import(/* webpackChunkName: "group-user" */ '@/components/RegisterPage.vue') },
    ]
});

export default  router;