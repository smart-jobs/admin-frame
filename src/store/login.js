import * as types from './mutation-types';
import Cookies from 'js-cookie';
import Jwt from 'jsonwebtoken';
import util from '@lib/utils/user-util';

const api = {
  login: '/naf/login',
  qrcode: '/naf/qrcode',
};

export const state = () => ({
  loading: false,
  isAuthenticated: util.user && util.user.role !== 'guest',
  userinfo: util.user,
  unit: null,
  access_token: util.token,
  qrcode: null,
});

// getters
export const getters = {
  userStatus: state => (state.userinfo || {}).status,
};

// actions
export const actions = {
  async login({ commit, dispatch, state }, { qrcode, username, password, unit }) {
    commit(types.SHOW_LOADING);
    try {
      console.log('login unit: ', unit);
      // console.log(this.$axios);
      //let res = await auth.login({ username, password });
      let res = await this.$axios.$post(api.login, { qrcode, username, password }, { _tenant: unit });
      console.log(res);
      if (res.errcode && res.errcode !== 0) {
        commit(types.LOGIN_FAILURE);
      } else {
        // await dispatch('fetch', { username });
        commit(types.LOGIN_SUCCESS, res);
      }
      return res;
    } catch (err) {
      console.error(err);
      commit(types.LOGIN_FAILURE);
      return { errcode: -1, errmsg: 'error' };
    } finally {
      commit(types.HIDE_LOADING);
    }
  },
  async fetch({ commit /* , state */ }, { username }) {
    const res = await this.$axios.$get('/userinfo', { username });
    const { userinfo } = res;
    commit(types.USER_INFO, userinfo);
    return res;
  },
  async logout({ commit }) {
    // const res = await this.$axios.$post('/logout')
    // if (res.errcode != undefined && res.errcode === 0) {
    //   commit(types.LOGOUT_SUCCESS);
    // }
    // return res;
    commit(types.LOGOUT_SUCCESS);
    return { errcode: 0, errmsg: 'ok' };
  },
  async qrcode({ commit }) {
    const res = await this.$axios.$get(api.qrcode);
    if (res.errcode != undefined && res.errcode === 0) {
      commit(types.QRCODE_SUCCESS, res.data);
    }
    return res;
  },
};

// mutations
export const mutations = {
  [types.SHOW_LOADING](state) {
    state.loading = true;
  },
  [types.HIDE_LOADING](state) {
    state.loading = false;
  },

  [types.LOGIN_SUCCESS](state, { /*userinfo,*/ token }) {
    state.isAuthenticated = true;
    // state.userinfo = userinfo;
    state.access_token = token;
    const userinfo = Jwt.decode(token);
    state.userinfo = userinfo;
    Cookies.set('token', token);
    util.save({ userinfo, token });
    // TODO: 重定向到框架界面
    this.$router.push('/frame');
  },
  [types.LOGIN_FAILURE](state) {
    state.isAuthenticated = false;
  },
  [types.LOGOUT_SUCCESS](state) {
    state.isAuthenticated = false;
    state.userinfo = null;
    Cookies.remove('token');
  },
  [types.USER_INFO](state, payload) {
    state.userinfo = payload;
  },
  [types.SELECT_UNIT](state, payload) {
    state.unit = payload;
  },
  [types.QRCODE_SUCCESS](state, payload) {
    state.qrcode = payload;
  },
};

export const namespaced = true;
