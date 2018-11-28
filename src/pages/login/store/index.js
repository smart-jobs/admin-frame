/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import * as login from './login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
  },
});
