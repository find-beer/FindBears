/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet,Text} from 'react-native';

export default class PublishActivity extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return ({
            title: params ? params.selected : '考试',
            headerStyle: {
                backgroundColor: '#0367e1'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold'
            },
        })
    }

    render() {
        return <SafeAreaView style={styles.container}>
            <Text>111</Text>
        </SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
