/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import AsyncStorage from "@react-native-community/async-storage";
import {screenH, screenW} from "../../constants";

export default class Splash extends React.Component {

    componentWillMount() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        // AsyncStorage.removeItem('session')
        this.timer = setTimeout(() => {
            AsyncStorage.getItem('session', (error, result) => {
                if (result) {
                    const homeAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'TabContainer'})],//主页
                    });
                    this.props.navigation.dispatch(homeAction);
                } else {
                    const loginAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Login'})],//登录页
                    });
                    this.props.navigation.dispatch(loginAction);
                }
            });
        }, 2000);
    }

    render() {
        return <View style={styles.container}>
            <Image style={{resizeMode: 'contain', width: screenW, height: screenH}}
                source={require('../../assets/splash/splash.png')}/>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
