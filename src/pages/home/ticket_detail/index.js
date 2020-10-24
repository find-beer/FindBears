/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/header/index'
import SettingItem from "../../../components/setting_item";
import {screenW} from "../../../constants";

export default class TicketDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    addTicket = () => {

    }

    render() {
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'票种详情'}/>
            <View style={{flex: 1}}>
                <SettingItem title={'票种名称'} subType={'input'} inputHint={'请填写'}
                             reflectText={(title) => {
                                 this.setState({
                                     title
                                 })
                             }}
                />
                <SettingItem title={'价格'} subType={'number'} inputHint={'请填写'}
                             reflectNumText={(num) => {
                                 this.setState({
                                     num
                                 })
                             }}
                />
                <SettingItem title={'是否允许拼团'} reflectStatus={(status) => {
                    this.setState({
                        userStatus: status
                    })
                }} subType={'switch'} onRightPress={this.selectType}/>
                <SettingItem title={'票种说明'} subType={'none'}/>
                <TextInput textAlign='left'
                           underlineColorAndroid='transparent'
                           onChangeText={(text) => {
                               this.setState({
                                   content: text
                               })
                           }}
                           textAlignVertical="top"
                           multiline
                           style={styles.up}
                           placeholder={'此处添加票种说明...'}
                           placeholderTextColor='#999'/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.addTicket}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>保存</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    up: {
        height: 180,
        fontSize: 16,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 8
    },
    publish: {
        height: 60,
        width: screenW,
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {color: 'white', fontSize: 16},
});