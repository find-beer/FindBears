/**
 *  用户基本信息
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';
import {getDate} from '../../../utils/date'

export default props => {
    const {data} = props;
    return (
        <View style={{...styles.isRow, ...styles.container}}>
            <Image source={{uri:data.avatar?.replace('https','http')}} style={styles.headshot} />
            <View>
                <Text style={styles.name}>{data.nickname || `探熊用户${parseInt(Math.random()*10000)}`}</Text>
                <Text style={styles.time}>{getDate(data.commentTime)}</Text>
                <Text style={styles.words}>
                    {data.toUserId?`回复${data.toNickname || `探熊用户${parseInt(Math.random()*10000)}`}：`:''}{data.content}
                </Text>
            </View>
        </View>
    )
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
        borderRadius: scaleSize(44)
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
