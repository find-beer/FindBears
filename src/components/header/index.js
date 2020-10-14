/**
 * 头部组件
 */

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { scaleSize, scaleFont } from '../../utils/scaleUtil'

const backIcon = require('../../assets/mine/arrow_left.png')

export default props => (
    <View style={styles.headerContainer}>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {
                    <TouchableOpacity
                    activeOpacity={.6}
                    onPress={() => props.navigation && props.navigation.goBack()}>
                    <Image
                        source={backIcon}
                        style={styles.headerGoBackIcon} />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.headerTitleText}>{ props.title || '' }</Text>
            </View>
            <View style={styles.headerRight}>
                {
                    props.right && props.right
                }
            </View>
        </View>
    </View>
)


const styles = StyleSheet.create({
  headerContainer: {
      backgroundColor:'#FFF',
      marginBottom:scaleSize(20)
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: scaleSize(159),
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
  },
  headerLeft: {
      position: 'absolute',
      left: scaleSize(54)
  },
  headerGoBackIcon: {
      width: scaleSize(48.1),
      height: scaleSize(48.1)
  },
  headerTitle: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  headerTitleText: {
      fontSize: scaleFont(48),
      fontWeight: 'bold',
      color: '#333333'
  },
  headerRight: {
      position: 'absolute',
      right: scaleSize(54)
  }
})