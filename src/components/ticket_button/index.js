
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import {scaleFont, scaleSize} from "../../utils/scaleUtil";

export default props => (
    <TouchableOpacity
        style={[styles.wrapper, props.style]}
        activeOpacity={0.8}
        onPress={props.onTap}
    >
        <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    wrapper: {
        height: scaleSize(141),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F2F2F2',
        borderTopWidth: scaleSize(3),
        borderBottomWidth: scaleSize(3)
    },
    title: {
        fontSize: scaleFont(48),
        color: '#564F5F',
        fontWeight: 'bold'
    }
})
