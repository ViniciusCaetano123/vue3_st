import { createWebHistory, createRouter } from 'vue-router';

import index from '../st/mercadorias/index.vue'
import indexL from '../st/legislacao/index.vue'
import indexS from '../st/simuladorCalculos/index.vue'
import indexSE from '../st/simuladorCalculos/ncm/encontrados.vue'


const routes = [    
    {path:'/mercadorias', name:'stmercadorias',component: index},
	{path:'/legislacao/', name:'stlegislacao',component: indexL},
	{path:'/simuladorCalculos/', name:'stsimuladorCalculos',component: indexS},
	{path:'/simuladorCalculos/encontrados', name:'stsimuladorCalculosE',component: indexSE},
	
     
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;