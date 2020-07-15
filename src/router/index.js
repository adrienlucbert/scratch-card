import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import('../views/Card.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
