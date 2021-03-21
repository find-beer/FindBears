/**
 *  卡片信息
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';

export default props => {
    return (
        <View style={styles.container}>
            {props.data.map((item, index) => {
                return (
                    <View key={index} style={styles.itemContainer}>
                        <View style={styles.itemContent}>
                            <View style={styles.tag} />
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.content} numberOfLines={1}>
                                    {item.content}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: scaleSize(972),
        height: scaleSize(560),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemContainer: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContent: {
        width:scaleSize(400),
        flexDirection: 'row',
    },
    tag: {
        width: scaleSize(12),
        height: scaleSize(32),
        marginRight: scaleSize(24),
        backgroundColor: '#8E79FE',
        borderRadius: scaleSize(7),
    },
    title: {
        width:scaleSize(400),
        fontSize: scaleFont(40),
        color: '#999999',
        alignItems: 'center',
        marginBottom: scaleSize(24),
    },
    content: {
        width:scaleSize(400),
        fontSize: scaleFont(48),
        color: '#333333',
    },
});
