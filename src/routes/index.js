import { createWebHistory, createRouter } from 'vue-router';

import index from '../st/mercadorias/index.vue'


const routes = [    
    {path:'/mercadorias', name:'stmercadorias',component: index},
     
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;