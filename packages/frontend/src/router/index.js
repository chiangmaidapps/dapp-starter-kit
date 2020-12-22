import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Send from '../views/Send.vue';
import Balances from '../views/Balances.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/send',
        name: 'Send',
        component: Send
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
