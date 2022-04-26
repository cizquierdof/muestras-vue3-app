import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Lanzadera from '@/views/Lanzadera.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/lanzadera',
        name: 'Lanzadera',
        component: Lanzadera,
        meta: { title: 'Lanzadera' }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { title: 'About' }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;