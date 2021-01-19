/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:32:50
 * @LastEditTime : 2021-01-17 22:19:25
 * @FilePath     : /src/redux/index.js
 */
import { bindActionCreators } from 'redux';
import actions from './actions';

export const bindActions = (extraActions = {}) => dispatch => bindActionCreators({
  ...actions.request,
  ...actions.setter,
  ...extraActions,
} , dispatch);

export const bindState = state => ({
  ...state,
});

export { connect } from 'react-redux'