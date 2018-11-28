/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import moment from 'moment';

export function dict(value, codes) {
  if (!value) return '';
  value = value.toString();
  if (codes) {
    value = _.get(codes, [value]) || value;
  }
  return value;
}

export function date(value, formmat) {
  if (!value) return '';
  return moment(value).format(formmat);
}
