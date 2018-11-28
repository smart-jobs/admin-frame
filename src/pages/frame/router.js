import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/frame',
      component: () => import(/* webpackChunkName: "frame_main" */ './views/Frame.vue'),
    },
  ],
});

export default router;
