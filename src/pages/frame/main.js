import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@lib/plugins/meta';
import '@lib/plugins/element';
import '@lib/plugins/mint-ui';
import '@lib/plugins/axios';
import '@lib/plugins/check-res';
import '@/style/index.less';
import '@/style/common.less';

Vue.config.productionTip = false;

store.$router = router;
router.$store = store;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
