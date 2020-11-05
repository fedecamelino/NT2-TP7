import { createWebHistory, createRouter } from 'vue-router'

import Formulario from '../components/Formulario.vue'
import Tareas from '../components/Tareas.vue'

const routes = [
    /* Se cargar todos los routers */
    { path: '/', name: 'Home', component: Formulario },
    { path: '/formulario', name: 'Formulario', component: Formulario },
    { path: '/tareas', name: 'Tareas', component: Tareas }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
