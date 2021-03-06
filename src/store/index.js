/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutation-types';
import * as menu from '@/store/naf/menu';
import * as dict from '@lib/store/naf/dict';
import util from '@lib/utils/user-util';
import * as login from './login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    naf: {
      namespaced: true,
      modules: {
        menu,
        dict,
      },
    },
    login,
  },
  state: {
    loading: false,
    platform: 'school',
    unit: null,
    name: null,
  },
  getters: {
    platform: state => state.login.platform,
    isAuthenticated: state => state.login.isAuthenticated,
    userinfo: state => state.login.userinfo,
    // access_token: state => state.login.access_token,
    // unitcode: state => state.login.unit,
    menuItems: state => state.naf.menu.items,
  },
  mutations: {
    [types.SHOW_LOADING](state) {
      state.loading = true;
    },
    [types.HIDE_LOADING](state) {
      state.loading = false;
    },
    [types.USER_INFO](state, { userinfo }) {
      state.userinfo = userinfo;
    },
    [types.PLATFORM_INIT](state, { unit = 'master', name }) {
      state.name = name;
      if (unit === 'master') {
        state.platform = 'master';
        state.unit = null;
      } else {
        state.platform = 'school';
        state.unit = unit;
      }
    },
  },
  actions: {
    async load({ commit, dispatch }) {
      console.log('start loading data...');
      commit(types.SHOW_LOADING);
      await dispatch('naf/menu/load');
      await dispatch('naf/dict/load', 'unit');
      commit(types.HIDE_LOADING);
      console.log('load data ok！');
    },
  },
});
