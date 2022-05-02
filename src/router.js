import { createRouter, createWebHistory } from 'vue-router'
import PublicationViewAll from './components/publication/PublicationViewAll.vue'
import UsersView from './components/user/UsersView.vue'
import PublicationCreate from './components/publication/PublicationCreate.vue'
import PublicationViewDetails from './components/publication/PublicationViewDetails.vue'
import RegistrationView from './components/registration/RegistrationView.vue'
import { isAuth } from './store'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Julkaisut',
            component: PublicationViewAll
        },
        {
            path: '/users',
            name: 'Käyttäjät',
            component: UsersView
        },
        {
            path: '/create',
            name: 'Uusi Postaus',
            component: PublicationCreate
        },
        {
            path: '/publication/:publicationId',
            props: true,
            name: 'Yksittäinen postaus',
            component: PublicationViewDetails
        },
        {
            path: '/register',
            name: 'Rekisteröityminen',
            component: RegistrationView
        }
    ]
})

router.beforeEach((to, from, next)=>{
    if(to.path === '/users' && !isAuth.value){
        next('/')
    } else {
        next()
    }
})

export { router }