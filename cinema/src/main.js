import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";
import routes from "@/routes";

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount("#app")