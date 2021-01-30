/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-22 00:22:30
 * @LastEditTime : 2021-01-24 22:56:35
 * @FilePath     : /src/redux/actions/setterActions.js
 */
export const PUBLISH_MODAL_STATE = 'PUBLISH_MODAL_STATE'
export const setPublishModal = (show) => {
  return {
    show,
    type: PUBLISH_MODAL_STATE,
  }
}

export const MODAL_LOADING_STATE = 'MODAL_LOADING_STATE'
export const setModalLoading = (show, title) => {
  return {
    show,
    title,
    type: MODAL_LOADING_STATE,
  }
}

export const USER_INFO = 'USER_INFO'
export const setUserInfo = (userInfo) => {
  return {
    userInfo,
    type: USER_INFO,
  }
}

export const SET_NAVIGATION = 'SET_NAVIGATION'
export const setRouteNavigation = (navigation) => {
  return {
    navigation,
    type: SET_NAVIGATION,
  }
}