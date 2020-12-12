/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {PermissionsAndroid, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from "../../components/scrollable_tab_bar/CustomTabBar";
import Activities from "./activities";
import Trends from "./trends";
import EventBus from "../../utils/EventBus";
import {addLocationListener, Geolocation, init, setNeedAddress} from "react-native-amap-geolocation";
import {GetRequest} from "../../utils/request";

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

    };

    /**
     * 查询个人信息
     * @returns {Promise<void>}
     */
    getUserInfo = async (flag) => {
        const response = await GetRequest('user/detail', {});
        console.log('用户信息', response);
        if (response.code === 0) {
            if (flag) {
                console.log('------->草稿');
                this.props.navigation.navigate('EditDraft', {"draft": response.data, userType: response.data.userType})
            } else {
                console.log('------->首次');
                this.props.navigation.navigate('PublishActivity', {userType: response.data.userType})
            }
        }
    }

    /**
     * 查询草稿
     */
    queryDraft = async () => {
        const response = await GetRequest('activity/querydraft', {});
        if (response.data) {
            console.log('存在草稿');
            this.getUserInfo(true);

        } else { //
            console.log('不存在草稿');
            this.getUserInfo(false);
        }
    }

    componentDidMount() {
        EventBus.on('SESSION_EXPIRED', () => {
            this.props.navigation.navigate('Login')
        })
        EventBus.on('GO_ACTIVITY', () => {
            this.queryDraft();
        })
        EventBus.on('GO_TREND', () => {
            this.props.navigation.navigate('PublishTrend')
        })
        // this.loadLocation().then(r => {});
        // this.startToPay();
    }

    render() {
        return <Fragment>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
            <SafeAreaView style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <CustomTabBar/>}
                >
                    <View style={styles.container} tabLabel="关系网">
                        <Activities {...this.props}/>
                    </View>
                    <View style={styles.container} tabLabel="北京">
                        <Trends {...this.props}/>
                    </View>
                </ScrollableTabView>
            </SafeAreaView>
            <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        </Fragment>
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
