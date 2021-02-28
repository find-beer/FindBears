/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from "../../../components/header";
import {screenW} from "../../../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect, bindActions, bindState } from './../../../redux'
class TicketSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: props.route.params.data.ticketVoList,
            data: props.route.params.data,
            publishTime: props.route.params.data.publishTime,
            isVisible: false,
            currentIndex: 0,
            time: ''
        };
    }

    confirmInfo = () => {
        const {currentIndex, tickets, time, publishTime} = this.state;
        if (time === '请选择' && !publishTime) {
            alert('请选择活动时间')
            return
        }
        this.props.navigation.navigate('Pay', {data: this.state.data, ticket: tickets[currentIndex], time})
    }

    renderItem = (rowData) => {
        const {item, index} = rowData;
        const {currentIndex} = this.state;
        return (
            <TouchableOpacity onPress={() => this.setState({currentIndex: index})}>
                <View style={styles.card}>
                    <View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <Text style={styles.ticketName}>{item.ticketName} ￥{item.price}</Text>
                        </View>
                        <View style={{flex: 1}}/>
                        <View style={styles.shuo}>
                            <Text>说明：{item.illustration}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}/>
                    <Image style={styles.icon}
                           source={currentIndex === index ? require('../../../assets/publish/choose.png') :
                               require('../../../assets/publish/unchoose.png')}/>
                </View>
            </TouchableOpacity>
        );
    };

    hideDatePicker = () => {
        this.setState({isVisible: false})
    };


    handleConfirm = (date) => {
        this.setState({time: moment(date).format("YYYY-MM-DD HH:mm")}, () => {
        })
        this.hideDatePicker();
    };

    showTime = () => {
        this.setState({isVisible: true})
    }

    componentDidMount() {
        const {publishTime} = this.state;
        if (publishTime) {
            this.setState({
                time: publishTime
            })
        } else {
            this.setState({
                time: '请选择'
            })
        }
    }

    render() {
        const {tickets, time, isVisible, publishTime} = this.state;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.showTime()}>
                    <View style={styles.header}>
                        <Text>
                            {publishTime ? '活动时间' : "选择时间"}
                        </Text>
                        <Text>
                            {time}
                        </Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={tickets}
                    keyExtractor={(item, index) => item + index}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => {
                        return <View style={styles.footer}>
                            <Image style={styles.img} source={require('../../../assets/publish/small-bear-icon.png')}/>
                            <View style={styles.tip}>
                                <Text style={styles.msg}>小熊叮嘱：</Text>
                                <Text style={styles.msg}>参加活动的时候，要保证自己的安全哦</Text>
                            </View>
                        </View>
                    }}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.confirmInfo}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                headerTextIOS={'请选择'}
                confirmTextIOS={'确定'}
                cancelTextIOS={'取消'}
                isVisible={isVisible}
                mode={'datetime'}
                locale={'zh'}
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
            />
        </Fragment>;
    }
}
export default connect(bindState, bindActions)(TicketSelect)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    publish: {
        height: 60,
        width: screenW,
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {color: 'white', fontSize: 16},
    card: {
        elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        shadowColor: '#cdcdcd',  //  阴影颜色
        shadowOffset: {width: 0, height: 0},  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        width: screenW - 32,
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 100,
        marginBottom: 12,
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center'
    },
    ticketName: {
        fontSize: 20,
        color: '#8A8DF9'
    },
    price: {
        fontSize: 20,
        color: '#8A8DF9',
        marginLeft: 12
    },
    footer: {
        flexDirection: 'row',
        marginLeft: 16,
        alignItems: 'center',
        marginTop: 20
    },
    img: {
        width: 30,
        height: 30,
    },
    icon: {
        width: 18,
        height: 18,
    },
    tip: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        marginRight: 16,
        marginLeft: 8,
        borderRadius: 8
    },
    msg: {
        margin: 4
    },
    shuo: {flexDirection: 'row', marginBottom: 10, alignItems: 'center'},

});
