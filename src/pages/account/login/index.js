/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GetRequest} from '../../../utils/request';

export default class Login extends React.Component {

    componentDidMount() {
    }

    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('TabContainer');
            }}>
                <Text>登录</Text>
            </TouchableOpacity>
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
