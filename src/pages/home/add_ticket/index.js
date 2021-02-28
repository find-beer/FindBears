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
import {GetRequest, PostRequest} from "../../../utils/request";
import EventBus from "../../../utils/EventBus";

export default class AddTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketName: '',
            price: '',
            illustration: '',
            ticketVoList: []
        };
    }

    addTicket = async () => {
        const {ticketName, price, illustration} = this.state;

        if(!ticketName){
            return
        }

        if(!price){
            return
        }

        let arr = this.state.ticketVoList ? this.state.ticketVoList : [];

        this.setState({
            ticketVoList: arr.push(
                {
                    assemble: 0,
                    assembleMemberCount: 0,
                    assemblePrice: price,
                    illustration,
                    price,
                    ticketName,
                    ticketState: 1
                }
            )
        }, () => {
            this.saveData(arr);
        })

    }

    /**
     * 立即发布/存为草稿
     */
    saveData = async (arr) => {
        const {
            id, activityTitle, activityTime, memberCount, enrollEndTime,
            activityAddress, activityTypeName, activityType,
            needInfo, content
        } = this.state;
        const {navigation} = this.props;
        try {
            const response = await PostRequest('activity/publish', {
                id,
                activityTitle,
                activityTime,
                memberCount,
                enrollEndTime,
                activityAddress,
                "location": '123.236944,41.267244',
                "ticketVoList": arr,
                activityTypeName,
                activityType,
                needInfo,
                content,
                "userType": 1,
                "activityValid": 1,
                "state": 1
            }, 'POST');
            if (response.code === 0) {
                EventBus.post('REFRESH_TICKETS', {});
                navigation.goBack();
            }
        } catch (e) {
        }
    }

    /**
     * 查询草稿
     */
    queryDraft = async () => {
        const response = await GetRequest('activity/querydraft', {});
        if (response.data) { //
            this.setState({
                activityTitle: response.data.activityTitle,
                memberCount: response.data.memberCount,
                activityAddress: response.data.activityAddress,
                activityTypeName: response.data.activityTypeName,
                activityType: response.data.activityType,
                needInfo: response.data.needInfo,
                activityTime: response.data.activityTime,
                enrollEndTime: response.data.enrollEndTime,
                content: response.data.content,
                ticketVoList: response.data.ticketVoList,
                id: response.data.id,
            })
        } else { //
        }
    }

    componentDidMount() {
        this.queryDraft();
    }

    render() {
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'新增票种'}/>
            <View style={{flex: 1}}>
                <SettingItem title={'票种名称'} subType={'input'} inputHint={'请填写'}
                             reflectText={(title) => {
                                 this.setState({
                                     ticketName: title
                                 })
                             }}
                />
                <SettingItem title={'价格'} subType={'number'} inputHint={'请填写'}
                             reflectNumText={(num) => {
                                 this.setState({
                                     price: num
                                 })
                             }}
                />
                <SettingItem title={'票种说明'} subType={'none'}/>
                <TextInput textAlign='left'
                           underlineColorAndroid='transparent'
                           onChangeText={(text) => {
                               this.setState({
                                   illustration: text
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
