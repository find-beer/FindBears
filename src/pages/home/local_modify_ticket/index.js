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
import { connect, bindActions, bindState } from './../../../redux'
class LocalModifyTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data,
            ticketName: '',
            price: '',
            illustration: '',
        };
    }

    modiTicket = () => {
        const {price, illustration, ticketName} = this.state;
        const {navigation,} = this.props;
        let item = {
            assemblePrice: price,
            price: price,
            ticketName: ticketName,
            illustration: illustration,
            ticketState: 1,
            assemble: 0,
            assembleMemberCount: 0,
        };

        route.params.onModify(item);
        navigation.goBack();

    }

    componentDidMount() {
        const {data, index} = this.state;
        this.setState({
            ticketName: data.ticketName,
            price: data.price,
            illustration: data.illustration,
        })
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
export default connect(bindState, bindActions)(LocalModifyTicket)
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
