import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
  base: process.env.BASE_URL + 'frame',
  routes: [
    {
      path: '/:module?',
      component: () => import(/* webpackChunkName: "frame_main" */ './views/Frame.vue'),
      children: [
        {
          path: '/',
          component: Home,
        },
        {
          path: ':path(.*)',
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  router.$store.commit('naf/menu/NAV_MODULE_SELECTED', to.params.module);
  next();
});

export default router;
