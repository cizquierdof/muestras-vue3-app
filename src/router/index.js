import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import AuditForm from '@/views/AuditForm.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { title: 'About' }
    },
    {
        path: '/audit_form',
        name: 'AuditForm',
        component: AuditForm,
        meta: { title: 'Formulario de auditoría' }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;