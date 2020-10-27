/**
 *  用户基本信息
 */

import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';

export default () => (
    <View style={{...styles.isRow, ...styles.container}}>
        <ImageBackground source={images.headshot} style={styles.headshot} />
        <View>
            <Text style={styles.name}>叄个键盘</Text>
            <Text style={styles.time}>2019-08-23 9:00</Text>
            <Text style={styles.words}>
                你好你好你好你好你好你好你好你好你好你好你好你
            </Text>
        </View>
    </View>
);

const images = {
    headshot: require('../../../assets/punchList/headshot.png'),
};

const styles = StyleSheet.create({
    isRow: {
        flexDirection: 'row',
    },
    container: {
        marginBottom: scaleSize(54),
    },
    headshot: {
        height: scaleSize(88),
        width: scaleSize(88),
        marginRight: scaleSize(24),
    },
    name: {
        fontSize: scaleSize(36),
        color: '#564F5F',
        marginBottom: scaleSize(15),
    },
    time: {
        fontSize: scaleSize(32),
        color: '#999999',
        marginBottom: scaleSize(11),
    },
    words: {
        fontSize: scaleSize(42),
        color: '#564F5F',
        maxWidth: scaleSize(800),
    },
});
