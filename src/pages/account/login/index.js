/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Fragment} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Image} from 'react-native';
import {GetRequest} from '../../../utils/request';
import {Button, Provider, Toast} from '@ant-design/react-native';
import {scaleFont, scaleSize} from '../../../utils/scaleUtil';
import AsyncStorage from "@react-native-community/async-storage";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPhone: '',
            userCode: '',
            btnText: '获取验证码',
            count: 60,
            result: '',
        };
    }

    changePhone(phone) {
        this.setState({
            userPhone: phone,
        });
    }

    changeCode(code) {
        this.setState({
            userCode: code,
        });
    }

    getSmsCode() {
        if (this.state.count !== 60) {
            return;
        }
        let validePhone = /^1\d{10}$/.test(this.state.userPhone);
        if (validePhone) {
            this.getSmsCodeRequest();
        }
    }

    getSmsCodeRequest() {
        GetRequest(`user/getVerifyCode/${this.state.userPhone}`).then(res => {
            console.log('获取验证码结果',res)
            if (res.code === 0) {
                this.startCountDown();
            } else {
                Toast.fail(res.msg || '发送失败，请稍后重试');
            }
        });
    }

    startCountDown() {
        const {count} = this.state;
        if (count === 1) {
            this.setState({
                count: 60,
                liked: true,
                btnText: '重新发送',
            });
        } else {
            this.setState({
                count: count - 1,
                liked: false,
                btnText: `${this.state.count}s`,
            });
            setTimeout(this.startCountDown.bind(this), 1000);
        }
    }

    login ()  {
        GetRequest(`user/login`,{
            phoneNumber:this.state.userPhone,
            verifyCode:this.state.userCode
        }).then(res => {
            if (res.code === 0) {
                this.props.navigation.navigate('TabContainer');
                AsyncStorage.setItem('session', res.data.token, null);
                AsyncStorage.setItem('userInfo', JSON.stringify(res.data), '');
            } else if(res.code === 10001){
                this.props.navigation.navigate('Register',{tel:this.state.userPhone});
            } else {
                Toast.fail(res.msg || '登录失败，请稍后重试');
            }

        });

    }

    toBack = () => {
        const {  navigation } = this.props
        navigation.navigate('Stack')
    }

    render() {
        return (
            <Provider>
                <Fragment>
                    <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                    <View style={styles.bgWrapper}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>登录后更精彩</Text>
                            <Text style={styles.headerText}>
                                {this.state.result}
                            </Text>
                        </View>
                        <View style={styles.loginForm}>
                            <View style={styles.flexBox}>
                                <TextInput
                                    value={this.state.userPhone}
                                    onChangeText={val => this.changePhone(val)}
                                    style={styles.formItem}
                                    placeholder="输入手机号"
                                />
                            </View>
                            <View style={styles.flexBox}>
                                <TextInput
                                    value={this.state.userCode}
                                    onChangeText={val => this.changeCode(val)}
                                    style={styles.formItem}
                                    placeholder="输入验证码"
                                />
                                <TouchableOpacity onPress={() => this.getSmsCode()}>
                                    <Text
                                        style={styles.getSmsCodeBtn}>
                                        {this.state.btnText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Button
                                style={styles.loginBtnBox}
                                onPress={() => this.login()}>
                                <Text style={styles.loginBtnText}>登录</Text>
                            </Button>
                        </View>
                    </View>
                </Fragment>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    bgWrapper: {
        backgroundColor: '#fff',
        height: '100%',
    },
    header: {
        marginTop: scaleSize(235),
        marginBottom: scaleSize(170),
    },
    headerText: {
        fontSize: scaleFont(52),
        color: '#564F5F',
        textAlign: 'center',
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#f2f2f2',
        marginBottom: scaleSize(87),
    },
    loginForm: {
        paddingLeft: scaleSize(110),
        paddingRight: scaleSize(110),
    },
    getSmsCodeBtn: {
        width: scaleSize(250),
        color: '#564F5F',
    },
    formItem: {
        flex: 1,
        paddingTop: scaleSize(36),
        paddingBottom: scaleSize(36),
        fontSize: scaleFont(42),
        margin: 0,
        padding: 0,
        color: '#999999',
    },
    loginBtnBox: {
        width: '100%',
        height: scaleSize(120),
        borderRadius: scaleSize(40),
        backgroundColor: '#8A8DF9',
    },
    loginBtnText: {
        color: '#fff',
    },
    topBar: {
        height: 40,
    },
    backButton: {
        height: 30,
        width: 50,
        backgroundColor: 'red'
    }
});
