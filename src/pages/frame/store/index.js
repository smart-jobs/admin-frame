/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import * as menu from '@/store/naf/menu';
import util from '@lib/utils/user-util';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    naf: {
      namespaced: true,
      modules: {
        menu,
      },
    },
  },
  state: {
    loading: true,
    platform: 'school',
    unit: null,
    name: null,
    userinfo: null,
    isAuthenticated: false,
  },
  getters: {
    platform: state => state.platform,
    isAuthenticated: state => state.isAuthenticated,
    userinfo: state => state.userinfo,
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
    async nuxtServerInit({ commit, dispatch }, { req, app, error }) {
      console.log('call nuxtServerInit...');
      const tenant = req.headers['x-tenant'] || '99991';
      console.log('x-tenant:', tenant);

      if (tenant !== 'master') {
        const res = await this.$axios.$get(`/naf/unit/fetch?code=${tenant}`);
        if (res && res.errcode) {
          console.error('fetch unit info fail:', res);
          error({ message: res.errmsg });
          return;
        }
        if (!res.data) {
          console.error('fetch unit info fail, invalid code: ', tenant);
          error({ message: '分站信息不存在' });
          return;
        }
        // console.log(res.data);
        const { name } = res.data;
        commit(types.PLATFORM_INIT, { unit: tenant, name });
      } else {
        commit(types.PLATFORM_INIT, { unit: tenant, name: '中心主站' });
      }

      // console.log(app.$axios);
      await dispatch('naf/menu/load');
    },
    async load({ commit, dispatch }) {
      console.log('start loading data...');
      commit(types.SHOW_LOADING);
      await dispatch('naf/menu/load');
      commit(types.USER_INFO, { userinfo: util.user, token: util.token });
      commit(types.HIDE_LOADING);
    },
  },
});
