/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 22:42:50
 * @LastEditTime : 2021-01-17 22:51:58
 * @FilePath     : /src/components/noData/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
const { width, height } = Dimensions.get('window')
const { useCallback } = React
export default (props) => {
  const { reload } = props
  useCallback(() => {
    reload()
  }, [reload])
  return (
    <View style={styles.container}>
      <Text>暂无数据</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height - 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
})