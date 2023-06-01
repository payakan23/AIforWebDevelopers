import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/auth/login',
            name: 'login',
            component: LoginView,
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/auth/signup',
            name: 'signup',
            component: SignupView,
            meta: {
                requiresAuth: false,
            }
        },

    ]
})


router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('accessToken');
    if (isAuthenticated == null && to.meta.requiresAuth) {
        return next({name: "login"})
    }
    next();
});

window.vueRouter = router;
export default router
