/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from "../../components/header";

export default class ActivityMsgList extends React.Component {
    render() {
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'活动列表'}/>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
});
