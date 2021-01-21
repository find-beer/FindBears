/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:34:14
 * @LastEditTime : 2021-01-22 00:22:12
 * @FilePath     : /src/redux/reducers/index.js
 */
import { combineReducers } from 'redux';

const reducers = {
  userInfo: (state = {}, action) => {
    const { type, userInfo } = action
    switch(type) {
      case 'USER_INFO':
        return { ...userInfo }
      default: 
        return state;
    }
  },
  showPublish: (state = false, action) => {
    const { type, show } = action
    switch(type) {
      case 'SHOW_PUBLISH':
        return show
      default: 
        return state;
    }
  }
}

export default combineReducers(reducers)