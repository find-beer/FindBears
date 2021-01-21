/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-22 00:22:30
 * @LastEditTime : 2021-01-22 00:23:18
 * @FilePath     : /src/redux/actions/setterActions.js
 */
export const setShowPublish = (show) => {
  return {
    show,
    type: 'SHOW_PUBLISH',
  }
}