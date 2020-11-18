/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from "../../../components/header";
import {screenW} from "../../../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default class TicketSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: props.navigation.state.params.data.ticketVoList,
            data: props.navigation.state.params.data,
            isVisible: false
        };
    }

    confirmInfo = () => {
        this.props.navigation.navigate('Pay', {data: this.state.data})
    }

    renderItem = (rowData) => {
        const {item} = rowData;
        console.log('item票种数据', item);
        return (
            <View style={styles.card}>
                <Text>{item.ticketName}</Text>
                <Text>￥{item.price}</Text>
                <Text>{item.illustration}</Text>
            </View>
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
        console.log('数据', this.state.data)
        console.log('票种', this.state.tickets)
    }

    render() {
        const {tickets, time, isVisible} = this.state;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'选择票种'}/>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.showTime()}>
                    <View style={styles.header}>
                        <Text>
                            选择时间
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
        justifyContent: 'center',
        paddingLeft: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center'
    }
});
