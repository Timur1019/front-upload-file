import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import UploadPage from '@/pages/UploadPage.vue';
import TranslationPage from '@/pages/TranslationPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import AdminPanel from '@/pages/AdminPage.vue'; // Админ-панель

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/upload',
        name: 'Upload',
        component: UploadPage
    },
    {
        path: '/translation/:fileId',
        name: 'Translation',
        component: TranslationPage,
        props: true
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPanel,
        meta: { requiresAuth: true, role: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] } // Ограничение по ролям
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    let userRole = [];

    if (isAuthenticated) {
        try {
            // Получаем роли из токена
            userRole = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).roles;
        } catch (e) {
            console.error('Ошибка при разборе токена:', e);
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'Login' });
        } else if (to.meta.role && !to.meta.role.some(role => userRole.includes(role))) {
            next({ name: 'Home' }); // Если роль не соответствует, перенаправляем на домашнюю страницу
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
