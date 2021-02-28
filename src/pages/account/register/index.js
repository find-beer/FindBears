/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-24 22:04:22
 * @LastEditTime : 2021-02-28 12:38:33
 * @FilePath     : /src/pages/account/register/index.js
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
import DateTimePicker from './../../../components/dateTimePicker';
import { scaleFont } from '../../../utils/scaleUtil';
import * as Toast from '../../../utils/toast'
import CheckBox from './../../../components/checkBox'
import { bindActions, bindState, connect } from '../../../redux';
import SelectType from './../../../components/selectType'
import moment from 'moment'
import { setStorage } from './../../../utils/storage'
import { ScrollView } from 'react-native-gesture-handler';

const isiPhone = Platform.OS === 'ios'
const genderOptions = [
  {label: '男', value: 2},
  {label: '女', value: 1 }
]
class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      avatarUrl: '',
      name: '',
      lng: '116.462595',
      lat: '40.005258',
      locationStr: '北京市朝阳区',
      birthdayTimeStamp: +new Date(),
      sex: genderOptions[0].value,
      hobbyTagNameList: [],
      introduction: '',
      phoneNumber: props.route.params && props.route.params.phoneNumber,
      birthdayDate: moment().format('YYYY-MM-DD'),
      showDateTimePicker: false,
      step: 1
    }
    this.intervalId = null
    this.scrollView = React.createRef()
    props.setModalLoading(false, '上传中')
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
   * 校验表单数据
   */
  verifyForm = () => {
    const { avatarUrl, name, introduction, locationStr } = this.state
    return {
      locationStrVaild: !!locationStr,
      nameVaild: !!name,
      avatarUrl: !!avatarUrl,
      introduction: !!introduction,
    }
  }


  uploadImage = async (uri) => {
    try {
      const headers = { 'Content-Type': 'multipart/form-data' }
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
      this.props.setModalLoading(false)
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
      if (data) {
        if (isiPhone) {
          this.uploadImage(`data:image/jpeg;base64,${data}`)
        } else {
          this.uploadImage(uri)
        } 
      }
    });
  }

  onComplete = (date) => {
    this.setState({ 
      showDateTimePicker: false,
      birthdayDate: moment(date).format('YYYY-MM-DD')
    })
    this.setFormData('birthdayTimeStamp', date)
  }

  onCheckboxChange = (item) => {
    const { value } = item
    this.setFormData('sex', value)
  }

  toNextStep = () => {
    const { nameVaild, avatarUrl, locationStrVaild } = this.verifyForm()
    if (!avatarUrl) {
      return Toast.toast('请上传头像')
    }
    if (!nameVaild) {
      return Toast.toast('请输入昵称')
    }
    if (!locationStrVaild) {
      return Toast.toast('请输入常住地')
    }
    this.setState({
      step: 2
    })
  }

  toRegiste = async () => {
    const { avatarUrl, birthdayDate, hobbyTagNameList, introduction, lat,  lng, locationStr, name, phoneNumber, sex }  = this.state
    const payload = {
      birthday: birthdayDate,
      headPicUrl: avatarUrl,
      hobbyTagNameList,
      introduction,
      lat,
      lng,
      locationStr,
      name,
      phoneNumber,
      sex,
    }
    try {
      this.props.setModalLoading(true, '注册中')
      const result = await this.props.post('/user/signUp', payload)
      const { success, data } = result
      this.props.setModalLoading(false)
      if (success) {
        Toast.toast('注册成功', () => {
          this.props.setUserInfo(data)
          setStorage('userInfo', data)
          this.props.navigation.navigate('Home')
        })
      } else {
        Toast.toast('注册失败，请重试')
      }
    } catch(error) {
      Toast.toast('注册失败，请重试')
    } finally{
      this.props.setModalLoading(false)
    }
  }

  render() {
    const { avatarUrl, step } = this.state
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.loginContainer} >
        <TouchableOpacity activeOpacity={1} style={styles.loginContainer} onPress={Keyboard.dismiss}>
          <SafeAreaView />
          {
          step === 1 
          ? <ScrollView style={styles.loginContainer} ref={this.scrollView}>
            <View style={styles.topContainer}>
              <TouchableOpacity onPress={this.chooseImage}>
                <ImageBackground style={styles.avatarContainer} source={require("../../../assets/register/uploadAvater.png")}>
                  { !!avatarUrl ? <Image style={styles.avatarContainer} source={{ uri: avatarUrl.replace("https", "http") }} /> : null }
                </ImageBackground>
              </TouchableOpacity>
              { !avatarUrl ? <Text style={styles.uploadImageLabel}>上传头像</Text> : null }
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>昵称：</Text>
                <TextInput
                  clearButtonMode='while-editing'
                  style={styles.input}
                  onChangeText={v => this.setFormData('name', v)}
                />
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>常住地：</Text>
                <TextInput
                  clearButtonMode='while-editing'
                  style={styles.input}
                  value={this.state.locationStr}
                  onChangeText={v => this.setFormData('city', v)}
                />
              </View>
              <TouchableOpacity style={styles.formItem} onPress={() => this.setState({ showDateTimePicker: true })}>
                <Text style={styles.formLabel}>出生日期：</Text>
                <Text style={[styles.birthdayDate]}>{this.state.birthdayDate}</Text>
              </TouchableOpacity>
              <View style={[styles.formItem, styles.noBorder]}>
                <Text style={styles.formLabel}>性别：</Text>
                <View style={styles.genderbox}>
                  <CheckBox onChange={this.onCheckboxChange} options={genderOptions}/>
                </View>
              </View>
              <View style={styles.textareaContainer}>
                <TextInput 
                  style={styles.textarea}
                  clearButtonMode='while-editing'
                  multiline={true}
                  maxLength={40}
                  onBlur={() => this.scrollView.current.scrollTo({ x: 0, y: 0, animated: true })}
                  onFocus={() => this.scrollView.current.scrollTo({ x: 0, y: 750, animated: true })}
                  onChangeText={v => this.setFormData('introduction', v)}
                  placeholder='请描述一下自己吧...'
                ></TextInput>
                <Text style={styles.count}>{this.state.introduction.length}/40</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={this.toNextStep}>
                <Text style={styles.loginButtonText}>下一步</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          : <View style={styles.loginContainer}>
              <View style={styles.selectTypeTitleContainer}>
                <Text style={styles.selectTypeTitle}>选择你喜欢的</Text>
              </View>
              <ScrollView style={styles.selectTypeContainer}>
                <SelectType onChange={v => this.setFormData('hobbyTagNameList', v)}/>
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={this.toRegiste}>
                  <Text style={styles.registerButtonText}>开启探熊之旅</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          <DateTimePicker
            show={this.state.showDateTimePicker}
            onComplete={this.onComplete}
            onCancel={() => this.setState({ showDateTimePicker: false })}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    // borderWidth: 1,
    // borderColor: 'rgba(169,169,169,0.5)',
    overflow: 'hidden',
  },
  uploadImageLabel: {
    fontSize: scaleFont(30),
    color:'#999999'
  },
  formItem: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169,169,169,0.2)',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    padding: 15,
    marginBottom: 30
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    height: 100,
  },
  birthdayDate: {
    flex: 1,
    lineHeight: 40,
    color: '#999999',
    textAlign: 'right',
  },
  arrowImage: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    fontSize: scaleFont(42),
    color: '#999999',
    textAlign:'right'
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
    fontSize: scaleFont(45),
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
  },
  genderbox: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textarea: {
    width: '100%',
    height: 200,
    lineHeight: 25,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(169,169,169,0.2)',
    color: '#888889'
  },
  textareaContainer: {
    height: 200,
  },
  count: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: '#888889'
  },
  selectTypeContainer: {
    flex: 1,
  },
  selectTypeTitle: {
    fontSize: 20,
    color: '#888889',
  },
  selectTypeTitleContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerButton: {
    height: 50,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgba(2,41,93,0.18)',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 100,
    borderRadius: 50
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '500'
  }
})
export default connect(bindState, bindActions)(Register)