import { createRouter, createWebHistory } from 'vue-router';

import Detail from '@/views/Detail.vue';
import List from '@/views/List.vue';
import Regist from '@/views/Regist.vue';
import Update from '@/views/Update.vue';

const routes = [
	{ path: '/', component: List },
	{ path: '/detail', component: Detail },
	{ path: '/regist', component: Regist },
	{ path: '/update/:id', component: Update },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
