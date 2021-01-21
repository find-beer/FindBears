/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-22 00:07:11
 * @LastEditTime : 2021-01-22 01:26:08
 * @FilePath     : /src/components/publish/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native'
const { width, height }= Dimensions.get('window')
import { bindState, bindActions, connect } from './../../redux'


class Publish extends Component{
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.path = new Animated.Value(0);
  }

  static getDerivedStateFromProps(nextProps) {
    const { showPublish } = nextProps
    return {
      visible: showPublish
    }
  }

  hideModal = () => {
    this.props.setShowPublish(false)
  }

  componentDidUpdate() {
    if (this.props.showPublish) {
      Animated.spring(this.path, { toValue: 1, useNativeDriver: true }).start()
    } else {
      Animated.timing(this.path, { toValue: 0}).start()
    }
  }

  getContentInterpolate(path) {
    return [{
      translateY: path.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [350, 100, 20]
      })
    }]
  }

  render() {
    const { visible } = this.state
    console.log('visible', visible)
    return (
      <Modal
        transparent
        visible={!!visible}>
          <TouchableOpacity activeOpacity={1} style={sytles.publishContainer} onPress={this.hideModal}>
            <Animated.View style={{ transform: this.getContentInterpolate(this.path)}}>
              <View style={sytles.contentContainer}>

              </View>
            </Animated.View>
          </TouchableOpacity>
      </Modal>
    )
  }
}

const sytles = StyleSheet.create({
  publishContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  contentContainer: {
    height: 350,
    width,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
})

export default connect(bindState, bindActions)(Publish)