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
import SettingItem from "../../../components/setting_item";
import { connect, bindState, bindActions } from './../../../redux'
class Pay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data,
            user: props.route.params.user,
            ticket: props.route.params.ticket,
            time: props.route.params.time,
            phone: '',
            name: '',
            card: ''
        };
    }

    payMoney = () => {

        const {data, user, time, ticket, name, phone, card} = this.state;
        const {navigation} = this.props;

        const params = {
            'activityId': data.id,
            'activityTime': time,
            'payType': 0,
            'ticketId': ticket.id,
            'userCardNo': card,
            'userName': name,
            'userPhone': phone,
        }

        if (!name) {
            alert('请填写真实姓名')
            return;
        }

        if (!phone) {
            alert('请填写手机号码')
            return;
        }

        if (!card && data.needInfo === 1) {
            alert('请填写证件号码')
            return;
        }
        try {
            PostRequest(apiProd.host + 'pay/info', params).then(res => {
                XPay.setAlipayScheme('tbApp');
                XPay.setAlipaySandbox(false);
                if (res.code === 0) {
                    XPay.alipay(res.data, (res) => {
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
        }


    }

    getUserInfo = async () => {
        const response = await GetRequest('user/detail', {});
        this.setState({
            user: response.data
        })
    }

    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        const {ticket, user, time, data, name, phone, card} = this.state;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'确认订单'}/>
            <View style={{flex: 1}}>

                <SettingItem title={'票种:'} subType={'txt'}
                             reflectNumText={(num) => {
                             }}
                             sub={ticket.ticketName}
                />

                <SettingItem title={'费用:'} subType={'txt'}
                             reflectNumText={(num) => {
                             }}
                             sub={ticket.price + '元'}
                />

                <SettingItem title={'活动时间:'} subType={'txt'}
                             reflectNumText={(num) => {

                             }}
                             sub={time}
                />

                <SettingItem title={'姓名:'} subType={'input'}
                             reflectText={(num) => {
                                 this.setState({
                                     name: num
                                 })
                             }}
                             sub={name}
                />

                <SettingItem title={'手机:'} subType={'input'}
                             reflectText={(num) => {
                                 this.setState({
                                     phone: num
                                 })
                             }}
                             sub={phone}
                />

                {
                    data.needInfo === 0 ? null :
                        <SettingItem title={'证件号码:'} subType={'input'}
                                     reflectText={(num) => {
                                         this.setState({
                                             card: num
                                         })
                                     }}
                                     sub={card}
                        />
                }

            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.payMoney}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>确认支付{ticket.price}元</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Fragment>;
    }
}
export default connect(bindState, bindActions)(Pay)
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
    left: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    right: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'space-between'
    },
    card: {
        // elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        // shadowColor: '#cdcdcd',  //  阴影颜色
        // shadowOffset: {width: 0, height: 0},  // 阴影偏移
        // shadowOpacity: 1,  // 阴影不透明度
        // width: screenW - 32,
        // marginLeft: 16,
        // borderRadius: 10,
        backgroundColor: 'white',
        height: 150,
        // marginTop: 12,
        // marginBottom: 12,
        justifyContent: 'center',
        paddingLeft: 16
    },
});
