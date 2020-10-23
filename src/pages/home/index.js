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
                <View style={styles.container} tabLabel="北京">
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
