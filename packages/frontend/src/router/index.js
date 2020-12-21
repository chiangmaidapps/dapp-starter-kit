import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Balances from '../views/Balances.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/balances',
        name: 'Balances',
        component: Balances
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
