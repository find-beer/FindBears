/**
 * 头部组件
 */

import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {scaleFont, scaleSize} from '../../utils/scaleUtil'

const backIcon = require('../../assets/mine/arrow_left.png')

export default props => (
    <View style={styles.headerContainer}>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {props.noLeft ? null :
                    <TouchableOpacity
                        activeOpacity={.6}
                        onPress={() => props.navigation && props.navigation.goBack()}>
                        <Image
                            source={backIcon}
                            style={styles.headerGoBackIcon}/>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.headerTitleText}>{props.title || ''}</Text>
            </View>

            <View style={styles.headerRight}>
                {props.right && 
									<TouchableOpacity
											activeOpacity={.6}
											onPress={() => props.onRightClick()}>
											<Text>
												{
													props.right && props.right
												}
											</Text>
									</TouchableOpacity>
                }
            </View>
        </View>
    </View>
)


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(159),
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    headerLeft: {
        position: 'absolute',
        left: scaleSize(54)
    },
    headerGoBackIcon: {
        width: scaleSize(80),
        height: scaleSize(80)
    },
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitleText: {
        fontSize: scaleFont(48),
        fontWeight: 'bold',
        color: '#333333'
    },
    headerRight: {
        position: 'absolute',
        right: scaleSize(54)
    }
})
