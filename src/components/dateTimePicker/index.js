/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-02-21 12:15:11
 * @LastEditTime : 2021-02-21 21:35:06
 * @FilePath     : /src/components/dateTimePicker/index.js
 */
import React from 'react';
import {
  View, 
  Text,
  Modal,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class CustomDateTimePicker extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      show: false
    }
    this.path = new Animated.Value(0);
  }

  static getDerivedStateFromProps(nextProps) {
    const { show } = nextProps
    return {
      show
    }
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({
      date: currentDate
    })
  };

  onComplete = () => {
    const { date } = this.state
    this.props.onComplete && this.props.onComplete(date)
  }

  onCancel = () => {
    this.props.onCancel && this.props.onCancel()
  }
   /**
   * 当显示隐藏Modal的状态更新时出发判断逻辑，进行动画的播放
   */
  componentDidUpdate() {
    if (this.props.show) {
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

  render() {
    const { show, date }  = this.state
    const isiOS = Platform.OS === 'ios'
    return (
      <Modal
        transparent
        visible={show}>
        {
          isiOS ? 
          <View style={styles.outsideContainer}>
            <Animated.View style={[ styles.container, {transform: this.getContentInterpolate(this.path)}]}>
              <View style={styles.topContainer}>
                <TouchableOpacity style={styles.leftButton}  onPress={this.onCancel}>
                  <Text style={styles.buttonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightButton} onPress={this.onComplete}>
                  <Text style={[styles.buttonText, styles.completeText]}>完成</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <DateTimePicker
                  maximumDate={new Date()}
                  testID="dateTimePicker"
                  value={date}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
              </View>
            </Animated.View>
          </View>
          :
          <DateTimePicker
            maximumDate={new Date()}
            testID="dateTimePicker"
            value={date}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        }
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  container: {
    width: '100%',
    paddingBottom: 10,
    marginTop: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent:'center',
  },
  bottomContainer: {
    paddingLeft: 50
  },
  topContainer: {
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169,169,169,0.1)',
  },
  leftButton: {
    width: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#888889',
  },
  completeText: {
    color: '#8A8DF9',
  }
})