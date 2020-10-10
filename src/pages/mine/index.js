/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Mine extends React.Component {
    render() {
        return <View style={styles.container} >
            <Text>我的</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
});
