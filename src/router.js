import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/frame',
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/frame',
      component: () => import(/* webpackChunkName: "frame" */ './views/Frame.vue'),
      children: [
        {
          path: '/frame',
          component: Home,
        },
        {
          path: '/frame/:module/:path(.*)',
        },
        {
          path: '/frame/:module',
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = router.$store.getters;
  if (!isAuthenticated && '/login' != to.path) {
    console.warn('not login, redirect login page...');
    next('/login');
    return;
  }
  console.log('to: ', to);
  router.$store.commit('naf/menu/NAV_MODULE_SELECTED', to.params.module);
  next();
});

export default router;
