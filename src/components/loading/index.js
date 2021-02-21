/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 18:45:00
 * @LastEditTime : 2021-02-21 13:57:11
 * @FilePath     : /src/components/loading/index.js
 */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

export default class Loading extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '加载中'
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { title }  = nextProps
    return {
      title
    }
  }

  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff"/>
          <Text style={styles.loadingText}>{title || '加载中'}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10
  },
  loadingText: {
    color: '#fff',
    marginTop: 15,
  }
})