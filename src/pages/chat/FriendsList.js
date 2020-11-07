/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from "../../components/header";
import {GetRequest} from "../../../utils/request";

export default class FriendsList extends React.Component {
    constructor(){
        this.state = {
            friendList:[]
        }
    }
    componentDidMount(){
        GetRequest('',{}).then(res => {
            console.log(res)
        })
    }
    render() {
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'好友列表'} right={'添加好友'}/>
            {/* {
                this.friendList.map(item => {

                })
            } */}
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
