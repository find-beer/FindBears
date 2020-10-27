/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/header/index'
import {screenW} from "../../../constants";

export default class AddTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    createTicket = () => {
        let arr = [];
        this.props.navigation.navigate('TicketDetail', {
            onAdd: (data) => {
                arr.push(data);
                this.setState({
                    // tickets: [...this.state.tickets, arr]
                    tickets: this.state.tickets.concat(arr)
                }, () => {
                    console.log('最终数据=>', this.state.tickets)
                })
            }
        })
    }

    modifyTicket = (index) => {
        let arr = [];
        console.log(this.state.tickets[index])
        this.props.navigation.navigate('ModifyTicket', {
            name: this.state.tickets[index].name,
            price: this.state.tickets[index].price,
            desc: this.state.tickets[index].desc,
            onModify: (data) => {
                arr.push(data);
                this.setState({
                    // tickets: [...this.state.tickets, arr]
                    tickets: this.state.tickets.concat(arr)
                }, () => {
                    console.log('最终数据=>', this.state.tickets)
                })
            }
        })
    }

    deleteTicket = (index) => {
        const {tickets} = this.state;
        console.log(tickets)
        this.state.tickets.splice(index, 1)
        this.setState({})
    }

    renderItem = (rowData) => {
        const {navigation} = this.props;
        console.log(rowData.item);
        console.log(rowData.index);
        const data = rowData.item;
        const index = rowData.index;
        console.log('item', data);
        return <View>
            <Text>{data.name}</Text>
            <Text>{data.price}</Text>
            <Text>{data.desc}</Text>
            <TouchableOpacity onPress={() => this.modifyTicket(index)}><Text>modify</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteTicket(index)}><Text>del</Text></TouchableOpacity>
        </View>
    };

    saveTicket = () => {
        console.log('最后提交数据', this.state.tickets);
    }

    render() {
        const {tickets} = this.state;
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'票种'}/>
            <View style={{flex: 1}}>
                <FlatList
                    data={tickets}
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
});
