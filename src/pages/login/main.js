import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@lib/plugins/meta';
import '@lib/plugins/element';
import '@lib/plugins/mint-ui';
import '@lib/plugins/axios';
import '@lib/plugins/check-res';
import InitStomp from '@lib/plugins/stomp';

Vue.config.productionTip = false;
Vue.config.weixin = {
  baseUrl: process.env.BASE_URL + 'weixin',
};
Vue.config.stomp = {
  // brokerURL: 'ws://192.168.1.190:15674/ws',
  brokerURL: '/ws', // ws://${location.host}/ws
  connectHeaders: {
    host: 'smart',
    login: 'web',
    passcode: 'web123',
  },
  // debug: true,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

InitStomp();
