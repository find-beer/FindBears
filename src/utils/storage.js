/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-02-27 15:07:08
 * @LastEditTime : 2021-02-27 15:26:14
 * @FilePath     : /src/utils/storage.js
 */
import AsyncStorage from '@react-native-async-storage/async-storage'
const { getItem, setItem, removeItem } = AsyncStorage
/**
* 默认没有过期时间，可以设置过期时间，时间单位为小时
* @param {String} key 存储键值
* @param {any} value 存储值
* @param {Number} expire 存储过期时间
*/
export const setStorage = async (key, value = {}, expire) => {
  const saveData = { value }
  if (typeof expire === 'number') {
      saveData.createTime = Date.now()
      saveData.expireTime = saveData.createTime + expire * 60 * 60 * 1000
  }
  return await setItem(key, JSON.stringify(saveData))
}

/**
* 获取存储值，如果存储值设置了存储过期时间，且当前已经过期，会返回undefined且会删除存储的值
* @param {String} key 
*/
export const getStorage = async (key) => {
  const saveData = await getItem(key)
  if (saveData) {
      const { value, expireTime } = JSON.parse(saveData)
      const currentTiem = Date.now()
      if (expireTime < currentTiem) {
          removeStorage(key)
      } else {
          return value 
      }
  }
  return 
}

/**
* 删除存储的信息
* @param {String} key 
*/
export const removeStorage = async (key) => {
return await removeItem(key)
}
