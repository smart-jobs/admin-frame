/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: null,
    loading: false,
  },
  mutations: {
    [types.USER_INFO](state, { userinfo }) {
      state.userinfo = userinfo;
    },
  },
  actions: {
    async load({ commit, state }) {
      // commit(types.USER_INFO, { userinfo: util.user, token: util.token });
      // if (!state.userinfo) return;
    },
  },
});
