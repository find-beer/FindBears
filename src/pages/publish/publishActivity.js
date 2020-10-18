/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from "../../components/header";
import {screenW} from "../../constants";
import SettingItem from "../../components/setting_item";
import EventBus from "../../utils/EventBus";

export default class PublishActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            num: '',
            area: '',
            type: '周边游',
            userStatus: false
        };
    }

    componentDidMount() {
        EventBus.on('typeName', (e) => {
            this.setState({
                type: e.item
            })
        })
    }

    /**
     * 存为草稿
     */
    saveDraft = () => {
        alert('存为草稿')
    }

    /**
     * 立即发布
     */
    immePublish = () => {
        const {
            title, num
        } = this.state;
        console.log(title, num)
    }

    showActivityTime = () => {
    }

    addTicket = () => {
        const {navigation} = this.props;
        navigation.navigate('AddTicket')
    }

    selectType = () => {
        global.selectItemsDialog.show()
    }

    render() {

        const {type} = this.state;

        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'发布活动'}/>
            <View style={{flex: 1}}>
                <SettingItem title={'活动标题'} subType={'input'} inputHint={'请填写标题'}
                             reflectText={(title) => {
                                 this.setState({
                                     title
                                 })
                             }}
                />
                <SettingItem title={'活动时间'} sub={'不选时间默认为长期活动'} onRightPress={this.showActivityTime}/>
                <SettingItem title={'活动人数'} subType={'number'} inputHint={'请填写人数'}
                             reflectNumText={(num) => {
                                 this.setState({
                                     num
                                 })
                             }}
                />
                <SettingItem title={'报名截止时间'} sub={'(默认活动开始前12小时)'}/>
                <SettingItem title={'活动位置'} subType={'input'}
                             reflectText={(area) => {
                                 this.setState({
                                     area
                                 })
                             }}
                             inputHint={'请填写位置'}/>
                <SettingItem title={'增加票种'} subType={'txt'} sub={'已设置0个'} showArrow onRightPress={this.addTicket}/>
                <SettingItem title={'活动类型'} subType={'txt'} sub={type} showArrow onRightPress={this.selectType}/>
                <SettingItem title={'是否需要报名人身份证信息'} reflectStatus={(status) => {
                    this.setState({
                        userStatus: status
                    })
                }} subType={'switch'} sub={type} onRightPress={this.selectType}/>
            </View>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.saveDraft}>
                    <View style={styles.draft}>
                        <Text>存为草稿</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.immePublish}>
                    <View style={styles.publish}>
                        <Text style={{color: 'white'}}>立即发布</Text>
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
    draft: {
        height: 60,
        width: screenW / 2,
        backgroundColor: '#cdcdcd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    publish: {
        height: 60,
        width: screenW / 2,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
