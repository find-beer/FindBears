import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity,StyleSheet} from 'react-native';
const imgUrl = {
    arrowIcon: require('../../../assets/register/arrow_bottom.png'),
    avater: require('../../../assets/register/uploadAvater.png'),
};
import ImagePicker from 'react-native-image-picker';
import {
    Provider,
    List,
    Button,
    TextareaItem,
    DatePicker,
    Toast,
} from '@ant-design/react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerForm: {
                headPicUrl: '',
                name: '',
                lng: '116.462595',
                lat: '40.005258',
                locationStr: '北京市朝阳区',
                birthday: undefined,
                sex: undefined,
                introduction: '我是',
                phoneNumber:
                    (this.props.navigation.state.params &&
                        this.props.navigation.state.params.tel) ||
                    '18311434653',
            },
            tips: {
                headPicUrl: '头像不能为空~',
                name: '名字不能为空',
                locationStr: '地址不能为空~',
                birthday: '生日不能为空~',
                sex: '性别也要加上~',
            },
            headPicUrl: '',
        };
    }
    confirmBirthday(value) {
        this.setState({
            birthday: value,
        });
    }
    changePosition(val) {
        console.log(val);
    }
    next() {
        let failFlag = '';
        for (let key in this.state.registerForm) {
            if (!this.state.registerForm[key]) {
                failFlag = key;
                break;
            }
        }
        if (failFlag) {
            Toast.fail(this.state.tips[failFlag]);
            return;
        }
        this.props.navigation.navigate('Hobby', this.state.registerForm);
    }
    changeDate(val) {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                birthday: val,
            },
        });
    }
    onSelectSex(value) {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                sex: value + 1,
            },
        });
    }
    choosePicture() {
        this.setState({});
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '图片库',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
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
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ');
            } else {
                const source = {uri: 'data:image/jpeg;base64,' + response.data};
                this.uploadImage({
                    uri: response.uri,
                    type: 'multipart/form-data',
                    name: 'headPic.jpg',
                });
                this.setState({
                    headPicUrl: source,
                });
            }
        });
    }
    uploadImage(file) {
        let formData = new FormData();
        formData.append('imgFile', file);
        fetch('http://121.89.223.103:8080/common/uploadImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                this.setState({
                    registerForm: {
                        ...this.state.registerForm,
                        headPicUrl: res.data.url,
                    },
                });
            });
    }
    render() {
        return (
            <Provider>
                <View style={styles.bgWrapper}>
                    <List style={styles.registerForm}>
                        <TouchableOpacity
                            style={styles.flexImg}
                            onPress={() => this.choosePicture()}>
                            <Image
                                source={this.state.headPicUrl || imgUrl.avater}
                                style={styles.avaterIcon}
                            />
                            <Text style={styles.label}>上传头像</Text>
                        </TouchableOpacity>
                        <View style={styles.flexBox}>
                            <Text style={styles.label}>昵称</Text>
                            <TextInput
                                value={this.state.registerForm.name}
                                onChangeText={val =>
                                    this.setState({
                                        registerForm: {
                                            ...this.state.registerForm,
                                            name: val,
                                        },
                                    })
                                }
                                style={styles.formItem}
                            />
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.label}>常驻地</Text>
                            {this.state.registerForm.locationStr ? (
                                <Text style={styles.formItem}>
                                    {this.state.registerForm.locationStr}
                                </Text>
                            ) : (
                                <Image
                                    source={imgUrl.arrowIcon}
                                    style={styles.arrowIcon}
                                />
                            )}
                        </View>
                        <View style={styles.dateBox}>
                            <DatePicker
                                value={this.state.registerForm.birthday}
                                mode="date"
                                minDate={new Date(1970, 1, 1)}
                                maxDate={new Date(2020, 1, 1)}
                                onChange={val => this.changeDate(val)}
                                format="YYYY-MM-DD">
                                <List.Item arrow="horizontal">
                                    <Text style={styles.dateLabel}>
                                        出生日期
                                    </Text>
                                </List.Item>
                            </DatePicker>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.label}>性别</Text>
                            <RadioGroup
                                style={styles.sexBox}
                                onSelect={value => this.onSelectSex(value)}>
                                <RadioButton value={1}>
                                    <Text>女</Text>
                                </RadioButton>
                                <RadioButton value={2}>
                                    <Text>男</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                        <View style={styles.flexBox}>
                            <TextareaItem
                                placeholder="描述一下自己吧..."
                                style={styles.introduction}
                                rows={4}
                                value={this.state.registerForm.introduction}
                                onChange={val =>
                                    this.setState({
                                        registerForm: {
                                            ...this.state.registerForm,
                                            introduction: val,
                                        },
                                    })
                                }
                            />
                        </View>
                        <Button
                            style={styles.registerBtnBox}
                            onPress={() => this.next()}>
                            <Text style={styles.registerBtnText}>下一步</Text>
                        </Button>
                    </List>
                </View>
            </Provider>
        );
    }
}

 const styles =  StyleSheet.create({
  bgWrapper: {
      backgroundColor: '#fff',
      height: '100%',
  },
  flexImg: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: scaleSize(150),
      marginBottom: scaleSize(100),
      alignItems: 'center',
      textAlign: 'center',
      borderWidth: 0,
  },
  avaterIcon: {
      alignSelf: 'center',
      width: scaleSize(278),
      height: scaleSize(278),
      marginBottom: scaleSize(50),
      borderRadius: scaleSize(139),
  },
  registerForm: {
      paddingLeft: scaleSize(110),
      paddingRight: scaleSize(110),
  },
  label: {
      fontSize: scaleFont(42),
      color: '#999999',
      width: scaleSize(200),
  },
  birthdayLabel: {
      fontSize: scaleFont(42),
      color: '#999999',
  },
  birthdayBox: {
      marginBottom: scaleSize(87),
      paddingBottom: scaleSize(36),
      paddingLeft: 0,
      paddingRight: 0,
      color: '#999999',
  },
  arrowIcon: {
      width: scaleSize(60),
      height: scaleSize(60),
      marginLeft: scaleSize(6),
  },
  flexBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: scaleSize(2),
      borderBottomColor: '#eee',
      marginBottom: scaleSize(87),
      paddingBottom: scaleSize(36),
  },
  formItem: {
      flex: 1,
      fontSize: scaleFont(42),
      margin: 0,
      padding: 0,
      textAlign: 'left',
      color: '#999999',
  },
  description: {
      width: '100%',
      height: scaleSize(300),
      borderWidth: scaleSize(3),
      padding: scaleSize(10),
      borderColor: '#f2f2f2',
      borderTopWidth: scaleSize(3),
  },
  registerBtnBox: {
      width: '100%',
      height: scaleSize(120),
      borderRadius: scaleSize(40),
      backgroundColor: '#8A8DF9',
      marginTop: scaleSize(70),
  },
  registerBtnText: {
      color: '#fff',
  },
  sexBox: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
  },
  radio: {
      borderWidth: scaleSize(1),
      borderColor: '#999',
      margin: scaleSize(10),
  },
  dateLabel: {
      color: '#999999',
      fontSize: scaleSize(42),
  },
  dateBox: {
      marginLeft: scaleSize(-40),
      marginTop: scaleSize(-70),
      marginBottom: scaleSize(50),
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
  },
});

