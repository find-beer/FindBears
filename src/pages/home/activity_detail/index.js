/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/header/index'
import {GetRequest} from "../../../utils/request";
import {screenW} from "../../../constants";
import moment from "moment";
import {RichEditor} from "react-native-pell-rich-editor";
import KV from "../../../utils/KV";

export default class ActivityDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation.state.params.id,
            data: {
                activityTitle: '',
                activityTime: '',
                cityName: '',
                memberCount: 0,
                content: ''
            },
        };
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
        alert('joinTalk')
    }

    immeJoin = () => {
        const {data} = this.state;
        this.props.navigation.navigate('TicketSelect', {data})
    }

    render() {
        const {data} = this.state;
        const {activityTitle, activityTime, cityName, memberCount} = data;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'活动详情'}/>
            <View style={{flex: 1}}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.left}>【活动名称】</Text>
                        <Text style={styles.right}>{activityTitle}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.left}>【活动时间】</Text>
                        <Text style={styles.right}>{moment(activityTime).format("YYYY-MM-DD HH:mm")}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.left}>【活动地点】</Text>
                        <Text style={styles.right}>{cityName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.left}>【参与人数】</Text>
                        <Text style={styles.right}>{memberCount}</Text>
                    </View>
                    {/*<View>*/}
                    {/*    <Text style={styles.left}>活动经费</Text>*/}
                    {/*    <Text style={styles.right}>{activityTitle}</Text>*/}
                    {/*</View>*/}

                </View>
                <RichEditor
                    disabled
                    initialContentHTML={data.content}
                />
            </View>
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
});
