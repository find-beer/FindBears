/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from "../../../components/header";
import {GetRequest, PostRequest} from "../../../utils/request";
import {apiProd} from "../../../config";
import {screenW} from "../../../constants";
import XPay from "react-native-puti-pay";

export default class Pay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.data,
            user: props.navigation.state.params.user,
            ticket: props.navigation.state.params.ticket,
            time: props.navigation.state.params.time,
        };
    }

    payMoney = () => {

        const {data, user, time, ticket} = this.state;
        const {navigation} = this.props;

        const params = {
            'activityId': data.id,
            'activityTime': time,
            'payType': 0,
            'ticketId': ticket.id,
            'userCardNo': '220200199129293939',
            'userName': user.name,
            'userPhone': user.phoneNumber,
        }
        console.log('===>', data);
        console.log('===>', params);

        try {
            PostRequest(apiProd.host + 'pay/info', params).then(res => {
                console.log('支付结果', res);
                console.log('支付串码', res.data);
                XPay.setAlipayScheme('tbApp');
                XPay.setAlipaySandbox(false);
                if (res.code === 0) {
                    XPay.alipay(res.data, (res) => {
                        console.log(res);
                        console.log(res.result);
                        if (res.resultStatus === '9000') {
                            alert('订单支付成功');
                            navigation.navigate('Home')
                        } else {
                            alert('支付失败请重试');
                        }
                    })
                }
            });
        } catch (e) {
            console.log('支付报错', e);
        }


    }

    getUserInfo = async () => {
        const response = await GetRequest('user/detail', {});
        console.log('用户信息', response);
        this.setState({
            user: response.data
        })
    }

    componentDidMount() {
        console.log('===>', this.state.ticket);
        this.getUserInfo()
    }

    render() {
        const {ticket, user, time} = this.state;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'确认订单'}/>
            <View style={{flex: 1, padding: 16}}>
                <View>
                    <View style={styles.rowTicket}>
                        <Text style={styles.name}>票种:</Text>
                        <Text style={styles.content}>{ticket.ticketName}</Text>
                    </View>
                    <View style={styles.rowTicket}>
                        <Text style={styles.name}>费用:</Text>
                        <Text style={styles.content}>{ticket.price}</Text>
                    </View>
                    <View style={styles.rowTicket}>
                        <Text style={styles.name}>活动时间:</Text>
                        <Text style={styles.content}>{time}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.name}>手机:</Text>
                        <Text style={styles.content}>{user ? user.phoneNumber : ''}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.name}>姓名:</Text>
                        <Text style={styles.content}>{user ? user.name : ''}</Text>
                    </View>
                    <View style={styles.rowInfo}>
                        <Text style={styles.name}>证件号码:</Text>
                        <Text style={styles.content}>{ticket.price}</Text>
                    </View>
                </View>
            </View>
            {/*<View style={styles.pay}>*/}
            {/*    <Text>支付宝</Text>*/}
            {/*    <Image style={styles.icon}*/}
            {/*           source={require('../../../assets/publish/choose.png')}/>*/}
            {/*</View>*/}
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.payMoney}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>确认支付88元</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    publish: {
        height: 60,
        width: screenW,
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {color: 'white', fontSize: 16},
    rowTicket: {
        flexDirection: 'row'
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 100,
        height: 50,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        color: 'green'
    },
    content: {
        fontSize: 18,
        color: 'green',
        marginLeft: 8
    },
    icon: {
        width: 18,
        height: 18,
    },
});
