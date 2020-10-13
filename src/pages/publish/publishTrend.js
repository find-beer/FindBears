/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export default class PublishTrend extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '发布动态',
    });

    render() {
        return <SafeAreaView style={styles.container}>
        </SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
