/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Alert, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/header/index'
import Button from '../../../components/ticket_button/index'
import {screenW} from "../../../constants";
import {scaleSize} from "../../../utils/scaleUtil";
import { connect, bindActions, bindState  } from './../../../redux'
class LocalTickets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ticketVoList: props.route.state.params.ticketVoList ? props.route.params.ticketVoList : [],
        };
    }

    createTicket = () => {
        let arr = [];
        const {navigation} = this.props;
        navigation.navigate('LocalAddTicket', {
            onAdd: (data) => {
                arr.push(data);
                this.setState({
                    ticketVoList: this.state.ticketVoList.concat(arr),
                })
            }
        })
    }

    modifyTicket = (index) => {
        const {navigation} = this.props;
        const {ticketVoList} = this.state;
        let arr = [];
        navigation.navigate('LocalModifyTicket', {
            onModify: (data) => {
                this.state.ticketVoList[index].ticketName = data.ticketName;
                this.state.ticketVoList[index].price = data.price;
                this.state.ticketVoList[index].illustration = data.illustration;
                this.setState({
                    ticketVoList: this.state.ticketVoList,
                })
            },
            data: ticketVoList[index]
        })
    }

    showAlert = (index) => {
        Alert.alert("确定要删除该票种么", '', [
            {
                text: "取消",
            },
            {
                text: "确认",
                style: 'destructive',
                onPress: () => {
                    this.deleteTicket(index)
                },
            },
        ]);
    }

    deleteTicket = async (index) => {
        const {ticketVoList} = this.state;
        ticketVoList.splice(ticketVoList.findIndex((item, position) => index === position), 1)
        this.setState({
            ticketVoList: ticketVoList.splice(ticketVoList.findIndex((item, position) => index === position), 1)
        })
    }

    renderItem = (rowData) => {
        const {navigation} = this.props;
        const data = rowData.item;
        const index = rowData.index;

        return <View><ImageBackground
            style={styles.tickeCard}
            source={require('../../../assets/publish/ticket-card.png')}>
            <View
                style={styles.tickeCardContent}>
                <View
                    style={
                        styles.tickeTypeSituation
                    }>
                    <Text
                        style={
                            styles.tickeType
                        }>
                        票种
                    </Text>
                    <Text
                        style={
                            styles.studentTicket
                        }>
                        {data.ticketName}
                    </Text>
                </View>
                <View
                    style={
                        styles.tickeTypeSituation
                    }>
                    <Text
                        style={
                            styles.GroupPrice
                        }>
                        价格
                    </Text>
                    <Text
                        style={
                            styles.tickePrice
                        }>
                        {data.price + ''}元
                    </Text>

                </View>
            </View>
            <View style={styles.btnWrap}>
                <Button
                    style={styles.butLeft}
                    title="编辑"
                    textStyle={{
                        color: '#333333',
                        fontSize: scaleSize(42),
                    }}
                    onTap={() => this.modifyTicket(index)}
                />
                <Button
                    style={styles.butRight}
                    title="删除"
                    textStyle={{
                        color: '#333333',
                        fontSize: scaleSize(42),
                    }}
                    onTap={() => this.showAlert(index)}
                />
            </View>

        </ImageBackground>
            <View style={{marginLeft: scaleSize(54)}}>
                <Text style={{color: '#333'}}>票种说明:</Text>
                <Text style={{color: '#999', marginRight: scaleSize(54),}}>{data.illustration}</Text>
            </View>
        </View>
    };

    saveTicket = () => {
        const {navigation, route} = this.props;
        const {ticketVoList} = this.state;
        route.params.onSubmit(ticketVoList);
        navigation.goBack();
    }

    componentDidMount() {
    }

    render() {
        const {ticketVoList} = this.state;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'票种'}/>
            <View style={{flex: 1}}>
                <FlatList
                    data={ticketVoList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.createTicket}>
                    <View style={styles.draft}>
                        <Text style={styles.txt}>创建新票种</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.saveTicket}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>保存</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Fragment>;
    }
}
export default connect(bindState, bindActions)(LocalTickets)
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
    ticketTypeListWrap: {
        flex: 1,
        marginBottom: scaleSize(150),
    },
    item: {
        fontSize: scaleSize(36),
        color: '#999999',
        marginHorizontal: scaleSize(54),
    },
    tickeCardPic: {
        height: scaleSize(506),
    },
    tickeCard: {
        width: scaleSize(1080),
        height: scaleSize(506),
        marginBottom: scaleSize(30),
        marginTop: scaleSize(27),
    },
    tickeCardContent: {
        flexDirection: 'row',
        marginLeft: scaleSize(54),
        marginTop: scaleSize(72),
    },
    tickeTypeSituation: {
        width: scaleSize(486),
        height: scaleSize(162),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tickeType: {
        color: '#333333',
        fontSize: scaleSize(42),
    },
    studentTicket: {
        color: '#8778F7',
        fontSize: scaleSize(57),
    },
    GroupPrice: {
        color: '#333333',
        fontSize: scaleSize(42),
    },
    tickePrice: {
        color: '#8778F7',
        fontSize: scaleSize(57),
    },
    btnWrap: {
        height: scaleSize(236),
        marginLeft: scaleSize(54),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    butLeft: {
        width: scaleSize(260),
        height: scaleSize(90),
        backgroundColor: '#F5F5F5',
        borderRadius: scaleSize(45),
        marginTop: scaleSize(20)
    },
    butRight: {
        width: scaleSize(260),
        height: scaleSize(90),
        backgroundColor: '#F5F5F5',
        borderRadius: scaleSize(45),
        marginTop: scaleSize(20)
    },
    returnTicket: {
        flexDirection: 'row',
        height: scaleSize(175),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: scaleSize(54),
        marginTop: scaleSize(60),
        borderTopWidth: scaleSize(3),
        borderBottomWidth: scaleSize(3),
        borderColor: '#F2F2F2',
    },
    returnTicketBtn: {
        flexDirection: 'row',
        height: scaleSize(175),
        alignItems: 'center',
    },
    returnTicketTitle: {
        fontSize: scaleSize(48),
        color: '#564F5F',
    },
    returnTicketTxt: {
        fontSize: scaleSize(39),
        color: '#999999',
    },
    arrow: {
        width: scaleSize(56),
        height: scaleSize(56),
    },
    header: {
        flexDirection: 'row',
        height: scaleSize(90),
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        paddingLeft: scaleSize(55),
    },
    voice: {
        width: scaleSize(60),
        height: scaleSize(60),
        marginRight: scaleSize(17),
    },
    headerTips: {
        color: '#999999',
        fontSize: scaleSize(39),
    },
    rtItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleSize(60),
        marginLeft: scaleSize(54),
        marginRight: scaleSize(54),
        height: scaleSize(67),
    },
    rtTxt: {
        color: '#564F5F',
        fontSize: scaleSize(48),
    },
    selected: {
        width: scaleSize(54),
        height: scaleSize(54),
    },
    bearTip: {
        height: scaleSize(162),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scaleSize(54),
        borderColor: '#F2F2F2',
        borderBottomWidth: scaleSize(3),
    },
    bearTipIcon: {
        width: scaleSize(48),
        height: scaleSize(48),
        marginRight: scaleSize(20),
    },
    bearTipTxt: {
        fontSize: scaleSize(39),
        color: '#8778F7',
    },
    structions: {
        marginTop: scaleSize(54),
        marginLeft: scaleSize(54),
    },
    structionsTitle: {
        color: '#999999',
        fontSize: scaleSize(39),
    },
    structionsLists: {
        marginTop: scaleSize(12),
        color: '#999999',
        fontSize: scaleSize(39),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
    },
});
