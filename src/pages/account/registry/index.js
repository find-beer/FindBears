/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-24 22:04:22
 * @LastEditTime : 2021-01-25 00:53:03
 * @FilePath     : /src/pages/account/registry/index.js
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  PixelRatio,
  Platform,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  SafeAreaView
} from 'react-native'
import ImagePicker from "react-native-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { scaleFont } from '../../../utils/scaleUtil';
import * as Toast from './../../../utils/toast'
import { bindActions, bindState, connect } from './../../../redux';

const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = px => PixelRatio.roundToNearestPixel(px);

const isiPhone = Platform.OS === 'ios'

class Registry extends Component{
  constructor(props) {
    super(props)
    this.state = {
      avatarUrl: '',
      formData:  {
        avatarUrl: "",
        name: "",
        lng: "116.462595",
        lat: "40.005258",
        locationStr: "北京市朝阳区",
        birthdayTimeStamp: '',
        sex: '',
        introduction: '',
        phoneNumber: props.route.params && props.route.params.phoneNumber,
      },
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
      // const { phoneNumberVaild, verifyCodeVaild } = this.verifyForm()
      // if (!phoneNumberVaild) {
      //   return Toast.toast('请输入正确手机号')
      // }
      // if (!verifyCodeVaild) {
      //   return Toast.toast('请输入正确验证码')
      // }
      // this.props.setModalLoading(true, '登录中')
      // const { phoneNumber, verifyCode } = this.state
      // const payload = { phoneNumber, verifyCode }
      // const { success, data, msg, code } = await this.props.get('/user/login', payload)
      // this.props.setModalLoading(false)
      // if (success) {
      //    this.props.setUserInfo(data)
      //    this.props.navigation.goBack()
      // } else {
      //   if (code === 10001) {

      //   } else {
      //     Toast.toast(msg)
      //   }
      // }
      this.props.navigation.navigate('Register')
    } catch(error) {
      console.log('error', error)
      Toast.toast('登录失败，请重试')
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

  uploadImage = async (uri) => {
    console.log('uri', uri)
    try {
      const headers = {'Content-Type': 'multipart/form-data'}
      const formData = new FormData();
      formData.append("imgFile", { uri, type: "multipart/form-data", name: `trend${new Date().getTime()}.jpg` });
      this.props.setModalLoading(true, '上传中')
      const { success, msg, data } = await this.props.post('/common/uploadImageNoAuth', formData, headers)
      this.props.setModalLoading(false)
      if (success) {
        this.setState({ avatarUrl: data.url })
      } else {
        Toast.toast('上传失败，请重试')
      }
    } catch(e) {
      console.log('e', e)
      Toast.toast('上传失败，请重试')
    }
  }

  chooseImage = async () => {
    this.setState({});
    const options = {
      title: "选择图片",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "图片库",
      cameraType: "back",
      mediaType: "photo",
      videoQuality: "high",
      durationLimit: 10,
      maxWidth: 600,
      maxHeight: 600,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      const { data, uri } = response
      if (isiPhone) {
        this.uploadImage(`data:image/jpeg;base64,${data}`)
      } else {
        this.uploadImage(uri)
      } 
    });
  }

  onChange = (date) => {
    console.log('date', date)
  }
  
  render() {
    const { avatarUrl, formData } = this.state
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.loginContainer} >
        <TouchableOpacity activeOpacity={1} style={styles.loginContainer} onPress={Keyboard.dismiss}>
          <SafeAreaView />
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={this.chooseImage}>
              <ImageBackground style={styles.avatarContainer} source={require("../../../assets/register/uploadAvater.png")}>
                { avatarUrl ? <Image style={styles.avatarContainer} source={{ uri: avatarUrl.replace("https", "http") }} /> : null }
              </ImageBackground>
            </TouchableOpacity>
            { !avatarUrl ? <Text style={styles.uploadImageLabel}>上传头像</Text> : null }
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.formItem}>
              <Text style={styles.formLabel}>昵称</Text>
              <TextInput
                clearButtonMode='while-editing'
                style={styles.input}
                onChangeText={v => this.setFormData('phoneNumber', v)}
              />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.formLabel}>常住地</Text>
              <TextInput
                clearButtonMode='while-editing'
                style={styles.input}
                onChangeText={v => this.setFormData('phoneNumber', v)}
              />
            </View>
            <View style={styles.formItem}>
            <Text style={styles.formLabel}>出生日期</Text>
            </View>
            <View style={[styles.formItem, styles.noBorder]}>
              <Text style={styles.formLabel}>性别</Text>
              <TextInput
                clearButtonMode='while-editing'
                style={styles.input}
                onChangeText={v => this.setFormData('phoneNumber', v)}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={this.toLogin}>
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
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
  topContainer: {
    height: 150,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: "#f6f7fa",
  },

  uploadImageLabel: {
    fontSize: scaleFont(30),
    color:'#999999'
  },

  formItem: {
    height: 40,
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginBottom: 30,
    flexDirection: 'row',
  },

  formLabel: {
    color: '#999999',
    height: 40,
    lineHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    fontSize: scaleFont(42),
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
  
  
  input: {
    flex: 1,
    fontSize: scaleFont(42),
    color: '#999999',
  },

  noBorder: {
    borderBottomWidth: 0
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
export default connect(bindState, bindActions)(Registry)