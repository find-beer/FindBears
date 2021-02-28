/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {} from 'react';
import {NativeAppEventEmitter, StyleSheet, View} from 'react-native';
import {NimSession, NimFriend} from 'react-native-netease-im';
// import {ChatInput, MessageList} from 'react-native-imui';
import {screenW} from "../../constants";

export default class Chatting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }

    }

    componentDidMount() {
        // NimSession.startSession('wzy', '2');
        NimSession.getRecentContactList().then(
            (data) => {
            },
            (err) => {
            },
        );
        NativeAppEventEmitter.addListener(
            'observeReceiveMessage',
            (data) => {
            },
        );

        const res=NimSession.sendTextMessage('你好，我是一条来自魏志扬发送的消息，请注意查收哦', ['mjx']);
    }

    render() {
        const {messages} = this.state;
        return <View>
            {/*<MessageList*/}
            {/*    style={styles.messageList}*/}
            {/*    initalData={messages}*/}
            {/*    avatarSize={{width: 40, height: 40}}*/}
            {/*    sendBubbleTextSize={18}*/}
            {/*    sendBubbleTextColor="000000"*/}
            {/*/>*/}
            {/*<SafeAreaView forceInset={{top: false}}>*/}
            {/*    <ChatInput*/}
            {/*        style={{*/}
            {/*            width: window.width,*/}
            {/*            height: 50,*/}
            {/*        }}*/}
            {/*        menuViewH={220}*/}
            {/*        defaultToolHeight={50}>*/}
            {/*    </ChatInput>*/}
            {/*</SafeAreaView>*/}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    messageList: {
        // backgroundColor: 'red',
        flex: 1,
        marginTop: 0,
        width: window.width,
        margin: 0,
    },
    inputView: {
        backgroundColor: 'green',
        width: window.width,
        height: 100,
    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7',
    },
    iconRow: {
        flexDirection: 'row',
        paddingHorizontal: screenW / 5 - 1,
        flexWrap: 'wrap',
        paddingVertical: 30,
    },
    actionCol: {
        alignItems: 'center',
        marginRight: screenW / 5,
        height: 95,
    },
    iconTouch: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
