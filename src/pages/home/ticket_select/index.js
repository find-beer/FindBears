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

export default class TicketSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: props.navigation.state.params.data.ticketVoList,
            data: props.navigation.state.params.data,
        };
    }

    confirmInfo = () => {
        this.props.navigation.navigate('Pay', {data: this.state.data})
    }

    renderItem = (rowData) => {
        const {item} = rowData;
        console.log('item票种数据', item);
        return (
            <View>
                <Text>{item.ticketName}</Text>
                <Text>{item.illustration}</Text>
                <Text>￥{item.price}</Text>
                <Text>{item.assembleMemberCount}</Text>
            </View>
        );
    };

    componentDidMount() {
        console.log('票种', this.state.tickets)
    }

    render() {
        const {tickets} = this.state;
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'选择(拼团)票种'}/>
            <View style={{flex: 1}}>
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
});
