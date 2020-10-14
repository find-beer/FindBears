/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import AsyncStorage from "@react-native-community/async-storage";

export default class Splash extends React.Component {

    componentWillMount() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            AsyncStorage.getItem('session', (error, result) => {
                if (error === null) {
                    const loginAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Login'})],//登录页
                    });
                    this.props.navigation.dispatch(loginAction);
                }
                if (result) {
                    const homeAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'TabContainer'})],//主页
                    });
                    this.props.navigation.dispatch(homeAction);
                }
            });
        }, 2000);
    }

    render() {
        return <View style={styles.container}>
            <Text>闪屏页</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
