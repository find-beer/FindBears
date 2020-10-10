/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';

export default class Home extends React.Component {
    render() {
        return <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('Activities')
            }}>
                <Text>首页</Text>
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
