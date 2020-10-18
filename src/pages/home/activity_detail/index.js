/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from '../../../components/header/index'

export default class ActivityDetail extends React.Component {

    render() {
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'活动详情'}/>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
