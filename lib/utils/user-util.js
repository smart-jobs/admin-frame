/* eslint-disable no-console */
export default {
  get user() {
    const val = sessionStorage.getItem('user');
    try {
      if (val) return JSON.parse(val);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
  set user(userinfo) {
    sessionStorage.setItem('user', JSON.stringify(userinfo));
    if (this.unit) {
      this.lastUnit = this.unit;
    }
  },
  get token() {
    return sessionStorage.getItem('token');
  },
  set token(token) {
    sessionStorage.setItem('token', token);
  },
  get isGuest() {
    return !this.user || this.user.role === 'guest';
  },
  get unit() {
    if (!this.user || this.user.iss !== 'platform') return undefined;
    const unit = this.user.sub.split('@', 2)[1] || 'master';
    return unit;
  },
  get platform() {
    const unit = this.unit || this.lastUnit;
    return unit === 'master' ? 'master' : 'school';
  },
  set lastUnit(value) {
    localStorage.setItem('unit', value);
  },
  get lastUnit() {
    return localStorage.getItem('unit');
  },
  save({ userinfo, token }) {
    this.user = userinfo;
    this.token = token;
  },
};
