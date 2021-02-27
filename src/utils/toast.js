/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 15:01:31
 * @LastEditTime : 2021-02-23 22:57:54
 * @FilePath     : /src/utils/toast.js
 */
import Toast from 'react-native-root-toast'

export const toast = (content, timeout = 1500, callback) => {
  if (typeof timeout === 'function') {
    callback = timeout
    timeout = 1500
  }
  Toast.show(content, {
    duration: timeout,
    position: Toast.positions.CENTER,
    onHidden: () => callback && callback()
  })
}

export const toastTop = (content, timeout = 1500 ) => {
  Toast.show(content, {
    duration: timeout,
    position: Toast.positions.TOP
  })
}

export const toastBottom = (content, timeout = 1500 ) => {
  Toast.show(content, {
    duration: timeout,
    position: Toast.positions.BOTTOM
  })
}