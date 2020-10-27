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

export default class ModifyTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.navigation.state.params.name,
            price: props.navigation.state.params.price,
            desc: props.navigation.state.params.desc,
        };
    }

    modiTicket = () => {
        const {name, price, desc} = this.state;
        this.props.navigation.state.params.onModify({
            name,
            price,
            desc,
        })
        this.props.navigation.goBack()
    }

    render() {
        const {name, price, desc} = this.state;
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'票种详情'}/>
            <View style={{flex: 1}}>
                <SettingItem title={'票种名称'} subType={'input'} inputHint={name}
                             reflectText={(title) => {
                                 this.setState({
                                     name: title
                                 })
                             }}
                />
                <SettingItem title={'价格'} subType={'number'} inputHint={price}
                             reflectNumText={(num) => {
                                 this.setState({
                                     price: num
                                 })
                             }}
                />
                {/*<SettingItem title={'是否允许拼团'} reflectStatus={(status) => {*/}
                {/*    this.setState({*/}
                {/*        userStatus: status*/}
                {/*    })*/}
                {/*}} subType={'switch'} onRightPress={this.selectType}/>*/}
                <SettingItem title={'票种说明'} subType={'none'}/>
                <TextInput textAlign='left'
                           underlineColorAndroid='transparent'
                           onChangeText={(text) => {
                               this.setState({
                                   desc: text
                               })
                           }}
                           value={desc}
                           textAlignVertical="top"
                           multiline
                           style={styles.up}
                           placeholder={'此处添加票种说明...'}
                           placeholderTextColor='#999'/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.modiTicket}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>修改</Text>
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
