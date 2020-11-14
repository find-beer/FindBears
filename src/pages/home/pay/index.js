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
import moment from "moment";

export default class Pay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.data,
            user: props.navigation.state.params.user,
        };
    }

    payMoney = () => {

        const {data, user} = this.state;

        const params = {
            'activityId': data.id,
            'activityTime': moment(data.activityTime).format("YYYY-MM-DD HH:mm"),
            'payType': 0,
            'ticketId': data.ticketVoList[0].id,
            'userCardNo': '220200199129293939',
            'userName': user.name,
            'userPhone': user.phoneNumber,
        }
        console.log('===>', data);
        console.log('===>', params);

        try {
            PostRequest(apiProd.host + 'pay/info', params).then(res => {
                console.log('支付结果', res);
                XPay.setAlipayScheme('tbApp');
                XPay.setAlipaySandbox(false);
                if (res.code === 0) {
                    // XPay.alipay("alipay_root_cert_sn=687b59193f3f462dd5336e5abf83c5d8_02941eef3187dddf3d3b83462e1dfcf6&alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_cert_sn=c916dc0502e04dacfddda4e79cc6d520&app_id=2021001192681929&biz_content=%7B%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22123456%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22App%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95Java%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fwww.liudurenmaibeijing.com%2Fpay%2Fnotify&sign=JvIS4%2BIp0UEnqXCegeTpa9VsXxFpLny0AHxh19O8mRWo1ADXw3CIIRBdMzcUogvsgAXgHUiB3HYalp5y5WSwdoPdasp2OPAiEbAPN03QoE%2BeyNtzT4faE790B5ruE0npBv5xCCBGWp3KnjVypmJoHogrkE0%2BD8JF9QLTrLDnj6PrqKRVNc8W5LBQuxbFCp1jwpYviloBUuZcCTjf8zZFQAGiYypx4lFAY%2FKopoxqKt6ndks67Vc47lSc4YJYnkQ8VhRswIGXF%2Fd%2BJ%2FfSEWk%2FwzuY6S0d%2FDtf4cugbE1FNfTFCwW3kfhj7E7Nl3%2Bw4ZtBT6cZxnElUygGg2eCyOU0JA%3D%3D&sign_type=RSA2&timestamp=2020-09-24+19%3A33%3A48&version=1.0", (res) => {
                    //     console.log(res);
                    //     console.log(res.result);
                    // })
                }
            });
        }catch (e) {
            console.log('支付报错',e);
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
        this.getUserInfo()
    }

    render() {
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'确认订单'}/>
            <View style={{flex: 1}}>

            </View>
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
});
