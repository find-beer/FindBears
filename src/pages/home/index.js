/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {PermissionsAndroid, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from "../../components/scrollable_tab_bar/CustomTabBar";
import Activities from "./activities";
import Trends from "./trends";
import EventBus from "../../utils/EventBus";
import {addLocationListener, Geolocation, init, setNeedAddress} from "react-native-amap-geolocation";
import {PostRequest} from "../../utils/request";
import {apiProd} from "../../config";

export default class Home extends React.Component {

    loadLocation = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ]);
        }
        await setNeedAddress(true);
        await init({
            ios: '5774b9a23bfef933c1a1f24cb81e8311',
            android: '2ed1655dedfd9f3453a54f2ab51a55bd',
        });

        addLocationListener(location => console.log('---->', location));
        Geolocation.getCurrentPosition(({coords}) => {
            console.log('定位===>', coords);
        }, (error) => {
            console.log('定位出错===>', error);
        });
    };

    startToPay = () => {
        PostRequest(apiProd + 'pay/info', {
            'activityId': 1223324000,
            'activityTime': 122320,
            'payType': 0,
            'ticketId': 100100123010,
        }).then(res => {
            console.log('支付结果', res);
            // XPay.setAlipayScheme('tbApp');
            // XPay.setAlipaySandbox(false);
            // if (res.code === 0) {
            //     XPay.alipay("alipay_root_cert_sn=687b59193f3f462dd5336e5abf83c5d8_02941eef3187dddf3d3b83462e1dfcf6&alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_cert_sn=c916dc0502e04dacfddda4e79cc6d520&app_id=2021001192681929&biz_content=%7B%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22123456%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22App%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95Java%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.01%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fwww.liudurenmaibeijing.com%2Fpay%2Fnotify&sign=JvIS4%2BIp0UEnqXCegeTpa9VsXxFpLny0AHxh19O8mRWo1ADXw3CIIRBdMzcUogvsgAXgHUiB3HYalp5y5WSwdoPdasp2OPAiEbAPN03QoE%2BeyNtzT4faE790B5ruE0npBv5xCCBGWp3KnjVypmJoHogrkE0%2BD8JF9QLTrLDnj6PrqKRVNc8W5LBQuxbFCp1jwpYviloBUuZcCTjf8zZFQAGiYypx4lFAY%2FKopoxqKt6ndks67Vc47lSc4YJYnkQ8VhRswIGXF%2Fd%2BJ%2FfSEWk%2FwzuY6S0d%2FDtf4cugbE1FNfTFCwW3kfhj7E7Nl3%2Bw4ZtBT6cZxnElUygGg2eCyOU0JA%3D%3D&sign_type=RSA2&timestamp=2020-09-24+19%3A33%3A48&version=1.0", (res) => {
            //         console.log(res);
            //         console.log(res.result);
            //     })
            // }
        });
    };

    componentDidMount() {
        EventBus.on('GO_ACTIVITY', () => {
            this.props.navigation.navigate('PublishActivity')
        })
        EventBus.on('GO_TREND', () => {
            this.props.navigation.navigate('PublishTrend')
        })
        // this.loadLocation().then(r => {});
        // this.startToPay();
    }

    render() {
        return <SafeAreaView style={styles.container}>
            <ScrollableTabView
                renderTabBar={() => <CustomTabBar/>}
            >
                <View style={styles.container} tabLabel="关系网">
                    <Activities {...this.props}/>
                </View>
                <View style={styles.container} tabLabel="XX活动">
                    <Trends {...this.props}/>
                </View>
            </ScrollableTabView>
        </SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
