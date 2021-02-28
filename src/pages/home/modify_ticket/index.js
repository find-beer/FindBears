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
import { connect, bindState, bindActions  } from './../../../redux'
class ModifyTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.route.params.index,
            ticketName: '',
            price: '',
            illustration: '',
            ticketVoList: []
        };
    }

    modiTicket = () => {
        const {index, ticketVoList, price, illustration, ticketName} = this.state;

        ticketVoList[index].assemblePrice = price;
        ticketVoList[index].ticketName = ticketName;
        ticketVoList[index].illustration = illustration;
        ticketVoList[index].ticketState = 1;
        ticketVoList[index].assemble = 0;
        ticketVoList[index].assembleMemberCount = 0;

        this.saveData(ticketVoList);

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
                EventBus.post('REFRESH_SHOULDER',{})
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
            }, () => {
                this.setState({
                    ticketName: this.state.ticketVoList[this.state.index].ticketName,
                    price: this.state.ticketVoList[this.state.index].price,
                    illustration: this.state.ticketVoList[this.state.index].illustration,
                })
            })
        } else { //
        }
    }

    componentDidMount() {
        this.queryDraft();
    }

    render() {
        const {ticketName, price, illustration} = this.state;
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'修改票种'}/>
            <View style={{flex: 1}}>
                <SettingItem title={'票种名称'} subType={'input'} inputHint={ticketName}
                             reflectText={(title) => {
                                 this.setState({
                                     ticketName: title
                                 })
                             }}
                             sub={ticketName}

                />
                <SettingItem title={'价格'} subType={'number'}
                             inputHint={'请填写'}
                             reflectNumText={(num) => {
                                 this.setState({
                                     price: num
                                 })
                             }}
                             sub={price}
                />
                <SettingItem title={'票种说明'} subType={'none'}/>
                <TextInput textAlign='left'
                           underlineColorAndroid='transparent'
                           onChangeText={(text) => {
                               this.setState({
                                   illustration: text
                               })
                           }}
                           value={illustration}
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
export default connect(bindState, bindActions)(ModifyTicket)
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
