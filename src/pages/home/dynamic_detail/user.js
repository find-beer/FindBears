/**
 *  用户基本信息
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';
import {getDate} from '../../../utils/date'

export default props => {
    const {data} = props;
    const {userVO, cityName, publishTime} = data;
    console.log(data)
    return (
        <View style={{...styles.isRow, ...styles.container}}>
            <Image source={{uri:userVO?.pic.replace('https','http')}} style={styles.headshot} />
            <View>
                <Text style={styles.name}>{userVO?.userName || ''}</Text>
                <View style={styles.isRow}>
                    <Text style={styles.city}>{cityName} 丨</Text>
                    <Text style={styles.time}>{getDate(publishTime)}</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    isRow: {
        flexDirection: 'row',
    },
    container: {
        marginBottom: scaleSize(54),
    },
    headshot: {
			height: scaleSize(132),
			width: scaleSize(132),
			marginRight: scaleSize(39),
			borderRadius: scaleSize(66)
    },
    name: {
        fontSize: scaleSize(48),
        color: '#564F5F',
        marginBottom: scaleSize(15),
    },
    city: {
        fontSize: scaleSize(36),
        color: '#999999',
    },
    time: {
        fontSize: scaleSize(36),
        color: '#999999',
    },
});
