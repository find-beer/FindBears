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
import {screenW} from "../../../constants";

export default class AddTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    createTicket = () => {
        this.props.navigation.navigate('TicketDetail')
    }

    saveTicket = () => {

    }

    render() {
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'票种'}/>
            <View style={{flex: 1}}>

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
