/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 21:28:43
 * @LastEditTime : 2021-02-21 19:52:43
 * @FilePath     : /src/components/notLogin/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { bindActions, bindState, connect } from './../../redux'
import { scaleFont } from './../../utils/scaleUtil'

class NotLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [
        '+蹦迪',
        '+篮球',
        '+健身',
        '+跑步',
        '+羽毛球',
        '+滑板',
        '+户外',
        '+桌游小专家',
        '+爬山当',
        '+滑板',
      ]
    }
  }

  toLogin = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    const { labels } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          { labels.map((item, index) => {
            return (
              <Text key={index} style={[styles.labels, styles[`text${index}`]]}>{item}</Text>
            )
          })}
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.toLoginButton} onPress={this.toLogin}>
          <Text style={styles.loginText}>去登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f7fa'
  },
  topContainer: {
    flex: 1,
    width: '100%',
  },
  toLoginButton: {
    width: 187,
    height: 45,
    backgroundColor: '#fff',
    shadowRadius: 14,
    elevation:4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgba(2,41,93,0.18)',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 40,
    marginBottom: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labels: {
    color: '#564F5F',
    fontWeight: '300',
    position: 'absolute'
  },
  loginText: {
    fontSize: scaleFont(50),
    color: '#888889'
  },
  text0: {
    left: 150,
    top: 50
  },
  text0: {
    left: 130,
    top: 90
  },text1: {
    left: 40,
    top: 150,
    backgroundColor: '#8066E3',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff',
    elevation:4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'rgba(2,41,93,0.18)',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },text2: {
    left: 80,
    top: 220,
    backgroundColor: '#8066E3',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff'
  },text3: {
    left: 250,
    top: 300
  },text4: {
    left: 270,
    top: 190,
    backgroundColor: '#8066E3',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff'
  },text5: {
    left: 180,
    top: 330,
    backgroundColor: '#8066E3',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff'
  },text6: {
    left: 40,
    top: 280,
  },text7: {
    left: 70,
    top: 50,
    backgroundColor: '#8066E3',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff'
  },text8: {
    left: 210,
    top: 90,
    backgroundColor: '#8066E3',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    color: '#fff'
  },text9: {
    left: 170,
    top: 140,
    
  },
})

export default connect(bindState, bindActions)(NotLogin)