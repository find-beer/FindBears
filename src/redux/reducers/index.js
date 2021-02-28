/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:34:14
 * @LastEditTime : 2021-02-27 15:01:43
 * @FilePath     : /src/redux/reducers/index.js
 */
import { combineReducers } from 'redux';
import { 
  PUBLISH_MODAL_STATE,
  MODAL_LOADING_STATE,
  USER_INFO,
  SET_NAVIGATION
} from './../actions/setterActions';
const reducers = {
  userInfo: (state = {}, action) => {
    const { type, userInfo } = action
    switch(type) {
      case USER_INFO:
        return { ...userInfo }
      default: 
        return state;
    }
  },
  publishModalState: (state = false, action) => {
    const { type, show } = action
    switch(type) {
      case PUBLISH_MODAL_STATE:
        return show
      default: 
        return state;
    }
  },
  modalLoadingState: (state = { show: false  }, action) => {
    const { type, show, title } = action
    switch(type) {
      case MODAL_LOADING_STATE:
        return {
          show,
          title
        }
      default: 
        return state;
    }
  },
  routeNavigation: (state = {}, action) => {
    const { type, navigation } = action
    switch(type) {
      case SET_NAVIGATION:
        return navigation
      default: 
        return state;
    }
  },
}

export default combineReducers(reducers)