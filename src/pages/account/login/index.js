/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 13:39:21
 * @LastEditTime : 2021-02-28 13:27:07
 * @FilePath     : /src/pages/account/login/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { scaleFont } from '../../../utils/scaleUtil';
import { setStorage } from './../../../utils/storage'
import * as Toast from './../../../utils/toast';
import { bindActions, bindState, connect } from './../../../redux';

class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      time: 60,
      buttonDisabled: false,
      phoneNumber: '',
      verifyCode: ''
    }
    this.intervalId = null
  }

  /**
   * 设置表单数据
   * @param {String} key 
   * @param {String} value 
   */
  setFormData = (key, value) => {
    const options = {}
    options[key] = value
    this.setState(options)
  }

  /**
   * 倒计时
   */
  getDownTime = () => {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        const { time } = this.state
        const options = {}
        if (time > 1) {
          options.buttonDisabled = true
          options.time = time - 1
        } else {
          options.buttonDisabled = false
          options.time = 60
          clearInterval(this.intervalId)
          this.intervalId = null
        }
        this.setState(options)
      }, 1000)
    }
  }

  /**
   * 校验表单数据
   */
  verifyForm = () => {
    const { phoneNumber, verifyCode } = this.state
    return {
      phoneNumberVaild: /^1[3456789]\d{9}$/.test(phoneNumber),
      verifyCodeVaild: /^[0-9]\d{5}$/.test(verifyCode)
    }
  }

  /**
   * 获取验证码
   */
  getVerifyCode = async () => {
    try {
      const { phoneNumberVaild } = this.verifyForm()
      const { phoneNumber } = this.state
      if (!phoneNumberVaild) {
        return Toast.toast('请输入正确手机号')
      }
      const { success, data, msg } = await this.props.get(`/user/getVerifyCode/${phoneNumber}`)
      console.log('getVerifyCode success: %s; code: %s;msg: %s', success, data, msg)
      if (success) {
        Toast.toast('获取验证码成功')
        this.getDownTime()
      } else {
        Toast.toast(msg)
      }
    } catch(error) {
      Toast.toast('获取验证码失败，请重试')
    }
  }

  /**
   * 登录
   */
  toLogin = async () => {
    try {
      const { phoneNumberVaild, verifyCodeVaild } = this.verifyForm()
      if (!phoneNumberVaild) {
        return Toast.toast('请输入正确手机号')
      }
      if (!verifyCodeVaild) {
        return Toast.toast('请输入正确验证码')
      }
      this.props.setModalLoading(true, '登录中')
      const { phoneNumber, verifyCode } = this.state
      const payload = { phoneNumber, verifyCode }
      const { success, data, msg, code } = await this.props.get('/user/login', payload)
      this.props.setModalLoading(false)
      if (success) {
          setStorage('userInfo', data)
          this.props.setUserInfo(data)
          this.props.navigation.goBack()
      } else {
        if (code === 10001) {
          this.props.navigation.navigate('Register', {
            phoneNumber,
          })
        } else {
          Toast.toast(msg)
        }
      }
    } catch(error) {
      console.log('error ----> ', error)
      Toast.toast('登录失败，请重试')
    } finally{
      this.props.setModalLoading(false)
    }
  }

  /**
   * 渲染获取验证码按钮
   */
  renderVerifyCodeButton = () => {
    const { buttonDisabled, time } = this.state
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.signButton} disabled={buttonDisabled} onPress={this.getVerifyCode}>
        <Text style={[styles.buttonText, buttonDisabled ? styles.buttonDisable : null ]}>{buttonDisabled ? `${time}s后获取` : '获取验证码'}</Text>
      </TouchableOpacity>
    )
  }
  
  /**
   * 组件卸载时清除计时器
   */
  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.intervalId = null
  }

  toHome = () => {
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.loginContainer} >
        <TouchableOpacity activeOpacity={1} style={styles.loginContainer} onPress={Keyboard.dismiss}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>登录后更精彩</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.formItem}>
              <TextInput
                clearButtonMode='while-editing'
                style={styles.input}
                keyboardType='number-pad'
                placeholder='输入手机号'
                maxLength={11}
                onChangeText={v => this.setFormData('phoneNumber', v)}
              />
            </View>
            <View style={styles.formItem}>
              <TextInput
                clearButtonMode='while-editing'
                style={styles.input}
                keyboardType='number-pad'
                placeholder='输入验证码'
                maxLength={6}
                onChangeText={v => this.setFormData('verifyCode', v)}
              />
              { this.renderVerifyCodeButton() }
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={this.toLogin}>
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.toHomeContainer} onPress={this.toHome}>
            <Text style={styles.toHomeText}>{`先逛逛>>`}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleContainer: {
    height: 50,
    marginTop: 117.5,
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: scaleFont(56),
    color: '#564F5F',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    
  },
  formItem: {
    height: 40,
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginBottom: 40,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    fontSize: scaleFont(42),
  },
  signButton: {
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: scaleFont(36),
    color: '#564F5F'
  },
  buttonDisable: {
    color: '#888889'
  },
  loginButton: {
    height: 40,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A8DF9',
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: scaleFont(56),
  },
  toHomeContainer: {
    height: 40,
    width: 80,
    marginTop: 10,
    marginLeft: 30,
    justifyContent: 'center',
  },
  toHomeText: {
    height: 30,
    lineHeight: 30,
    fontSize: scaleFont(32),
    color: '#888889'
  }
})
export default connect(bindState, bindActions)(Login)