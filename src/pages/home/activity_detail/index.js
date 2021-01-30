/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image} from 'react-native';
import Header from '../../../components/header/index'
import {GetRequest,PostRequest} from "../../../utils/request";
import {screenW} from "../../../constants";
import {RichEditor} from "react-native-pell-rich-editor";
import EventBus from '../../../utils/EventBus';
import { scaleSize } from '../../../utils/scaleUtil';

export default class ActivityDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.state.params.id,
            data: {
                activityTitle: '',
                activityTime: '',
                activityAddress: '',
                memberCount: 0,
                content: '',
                userType: 0
            },
        };
    }

    componentWillUnmount() {
        this.props.navigation.goBack()
    }

    requireDeviceData = async () => {
        const {id} = this.state;
        const response = await GetRequest('activity/activity/detail', {
            id
        });
        console.log('详情数据', response);
        this.setState({data: response.data})
    }

    componentDidMount() {
        this.requireDeviceData();
    }

    joinTalk = () => {
        
    }

    confirmParticipate = async () => {
        const {id} = this.state;
        const response = await PostRequest('enroll/publish', {
            activityId:id
        });
        EventBus.post('REFRESH_ORDERLIST')
    }

    immeJoin = () => {
        const {data} = this.state;
        if (data.userType === 0) {
            Alert.alert("是否要报名？", '', [
                {
                    text: "取消",
                },
                {
                    text: "确认",
                    style: 'destructive',
                    onPress: () => {
                        this.confirmParticipate();

                    },
                },
            ]);
        } else {
            this.props.navigation.navigate('TicketSelect', {data})
        }
    }

    handleConcer = (uid) => {
        GetRequest(`/userRelation/follow/${uid}`).then(() => {
			this.requireDeviceData();
		})
    }

    render() {
        const {data} = this.state;
        const {activityTitle, activityTime, activityAddress, memberCount, userVO} = data;
        const defaultImg = 'https://t-bear-test.oss-cn-beijing.aliyuncs.com/images/2020/12/27/45_auth_1609051566344_6288.jpg';
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'活动详情'}/>
            <View style={styles.userInfo}>
                <View style={styles.left}>
                    <Image source={{uri:(userVO?.pic || defaultImg).replace('https','http')}} style={styles.userAvatar} />
                    <Text style={styles.userName}>{userVO?.userName || '探熊'}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this.handleConcer(userVO?.userId)}>
                        <View style={styles.concerBtn}>
                            <Text style={{color:'red'}}>关注</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{flex: 1}}>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.left}>【活动名称】</Text>
                            <Text style={styles.right}>{activityTitle}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.left}>【活动时间】</Text>
                            <Text style={styles.right}>{activityTime ? activityTime
                                : '时间待定'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.left}>【活动地点】</Text>
                            <Text style={styles.right}>{activityAddress}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.left}>【参与人数】</Text>
                            <Text style={styles.right}>{memberCount}</Text>
                        </View>
                    </View>
                    <RichEditor
                        disabled
                        initialContentHTML={data.content}
                    />
                </View>
            </ScrollView>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.joinTalk}>
                    <View style={styles.draft}>
                        <Text style={styles.txt}>加入群聊</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.immeJoin}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>立即报名</Text>
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
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {color: 'white', fontSize: 16},
    left: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    right: {
        fontSize: 16,
        color: '#333'
    },
    row: {
        flexDirection: 'row',
        marginTop: 10
    },
    card: {
        // elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        // shadowColor: '#cdcdcd',  //  阴影颜色
        // shadowOffset: {width: 0, height: 0},  // 阴影偏移
        // shadowOpacity: 1,  // 阴影不透明度
        // width: screenW - 32,
        // marginLeft: 16,
        // borderRadius: 10,
        backgroundColor: 'white',
        height: 150,
        // marginTop: 12,
        // marginBottom: 12,
        justifyContent: 'center',
        paddingLeft: 16
    },
    userInfo:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: scaleSize(50),
        backgroundColor:'#fff',
        marginBottom: scaleSize(30),
        alignItems: 'center',
    },
    left:{
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: scaleSize(120),
        height: scaleSize(120),
        borderRadius: scaleSize(60),
        marginRight: scaleSize(30)
    },
    userName:{
        color:'#000'
    },
    concerBtn: {
        borderColor:'red',
        borderWidth: scaleSize(1),
        borderStyle:'solid',
        borderRadius:scaleSize(40),
        height: scaleSize(80),
        width: scaleSize(160),
        color:'red',
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center'
    }
});
