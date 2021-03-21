import React from 'react';
import {Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {screenW} from "../../constants";

export default class SettingItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderSub = (title,
                 sub,
                 inputHint,
                 subType,
                 onRightPress,
                 reflectNumText,
                 reflectText,
                 reflectStatus,
                 switchStatus
    ) => {
        if (subType === 'input') {
            return <TextInput
                onChangeText={(text) => {
                    reflectText(text)
                }}
                placeholderTextColor={'#cdcdcd'}
                placeholder={inputHint}
                style={styles.subInput}>{sub}</TextInput>
        } else if (subType === 'number') {
            return <TextInput
                keyboardType='numeric'
                onChangeText={(text) => {
                    reflectNumText(text)
                }}
                placeholderTextColor={'#cdcdcd'}
                placeholder={inputHint}
                style={styles.subInput}>{sub}</TextInput>
        } else if (subType === 'switch') {
            return <Switch
                onValueChange={(value) => {
                    reflectStatus(value ? 1 : 0);
                    this.setState({
                        switchStatus: value
                    }, () => {
                    })
                }}
                value={switchStatus}
                style={styles.switch}/>
        } else {
            return <TouchableOpacity onPress={onRightPress}>
                <Text style={[styles.txtInput, {marginRight: 16}]}>{sub}</Text>
            </TouchableOpacity>
        }
    }

    render() {
        const {
            title,
            sub,
            inputHint,
            subType,
            onRightPress,
            reflectNumText,
            reflectText,
            reflectStatus,
            showArrow,
            switchStatus
        } = this.props;
        return <View>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={{flex: 1}}/>
                {
                    this.renderSub(title,
                        sub,
                        inputHint,
                        subType,
                        onRightPress,
                        reflectNumText,
                        reflectText,
                        reflectStatus,
                        switchStatus
                    )
                }
                {
                    showArrow ?
                        <Image style={styles.img}
                               source={require('../../assets/mine/arrow_right.png')}/> : null
                }
            </View>
            <View style={styles.sep}/>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: screenW,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#333',
        fontSize: 16,
        marginLeft: 16
    },
    subInput: {
        height: 60,
        marginRight: 16,
        alignItems: "center",
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
        color: '#333',
        width: 50,
        justifyContent: 'flex-end',
        textAlign: 'right'
    },
    subType: {},
    sep: {
        backgroundColor: '#cdcdcd',
        height: 0.5,
        marginLeft: 16,
        marginRight: 16
    },
    txtInput: {
        fontSize: 14,
        height: 60,
        lineHeight: 60,
    },
    img: {width: 20, height: 25, marginRight: 16, tintColor: '#cdcdcd'},
    switch: {
        marginRight: 16
    }
});

