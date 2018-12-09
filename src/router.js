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
      children: [
        {
          path: '/:unit/login',
        },
      ],
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
  const { isAuthenticated, platform } = router.$store.getters;
  if (!isAuthenticated && !/\/login$/.test(to.path)) {
    console.warn('not login, redirect login page...');
    if (platform === 'master') {
      next(`/${platform}/login`);
    } else {
      next('/login');
    }
    return;
  }
  console.log('to: ', to);
  router.$store.commit('naf/menu/NAV_MODULE_SELECTED', to.params.module);
  next();
});

export default router;
