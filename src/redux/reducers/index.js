/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:34:14
 * @LastEditTime : 2021-01-17 21:51:28
 * @FilePath     : /src/redux/reducer/index.js
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
  }
}

export default combineReducers(reducers)