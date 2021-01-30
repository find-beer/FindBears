/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-22 00:07:11
 * @LastEditTime : 2021-01-30 15:09:26
 * @FilePath     : /src/components/publish/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native'
const { width }= Dimensions.get('window')
import { bindState, bindActions, connect } from './../../redux';
import { PublishIcon } from '../../constants';


class Publish extends Component{
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      navigation: {}
    }
    this.path = new Animated.Value(0);
  }

  static getDerivedStateFromProps(nextProps) {
    const { publishModalState, routeNavigation } = nextProps
    return {
      visible: publishModalState,
      navigation: routeNavigation
    }
  }

  /**
   * 隐藏Modal
   */
  hideModal = () => {
    this.props.setPublishModal(false)
  }

  /**
   * 当显示隐藏Modal的状态更新时出发判断逻辑，进行动画的播放
   */
  componentDidUpdate() {
    if (this.props.publishModalState) {
      Animated.spring(this.path, { toValue: 1, useNativeDriver: true }).start()
    } else {
      Animated.timing(this.path, { toValue: 0, useNativeDriver: true  }).start()
    }
  }

  /**
   * 获取动画的插值
   * @param {Animated} path 
   */
  getContentInterpolate(path) {
    return [{
      translateY: path.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [350, 100, 20]
      })
    }]
  }

  /**
   * 去发布
   * @param {String} type 
   */
  toPublish = (type) => {
    this.hideModal()
    const { uid } = this.props.userInfo
    if (!uid) {
      this.state.navigation.navigate('Auth')
    } else {
      if (type === 'active') {
        this.state.navigation.navigate('PublishActive', { userType: 1 })
      } else {
        this.state.navigation.navigate('PublishActive', { userType: 1 })
      }
    }
  }

  render() {
    const { visible } = this.state
    return (
      <Modal
        transparent
        visible={!!visible}>
          <TouchableOpacity activeOpacity={1} style={styles.publishContainer} onPress={this.hideModal}>
            <Animated.View style={{ transform: this.getContentInterpolate(this.path)}}>
              <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.btnBg} onPress={() => this.toPublish('active')}>
                  <Image style={styles.icon} source={PublishIcon.activity}/>
                  <Text>发布活动</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBg} onPress={() => this.toPublish('trend')}>
                  <Image style={styles.icon2} source={PublishIcon.trend}/>
                  <Text>发布动态</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  publishContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  contentContainer: {
    height: 300,
    width,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    width: 60,
    height: 60
  },
  icon2: {
    width: 60,
    height: 60
  },
  btnBg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
})

export default connect(bindState, bindActions)(Publish)