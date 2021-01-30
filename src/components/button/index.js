/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 19:49:31
 * @LastEditTime : 2021-01-30 15:24:26
 * @FilePath     : /src/components/button/index.js
 */
import React, { Component } from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import { bindActions, bindState, connect } from './../../redux'

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { userInfo, routeNavigation } = nextProps
    return {
      userInfo: Object.assign({}, userInfo),
      navigation: routeNavigation
    }
  }

  onPress = () => {
    const { uid } = this.state.userInfo
    if (uid) {
      this.props.onPress
    } else {
      this.state.navigation.navigate('Auth')
    }
  }

  render() {
    const { children, style, activeOpacity = 0.7 } = this.props
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={this.onPress}>
        { children }
      </TouchableOpacity>
    )
  }
}

export default connect(bindState, bindActions)(Button)