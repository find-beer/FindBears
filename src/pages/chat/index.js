/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    NativeAppEventEmitter
} from 'react-native';
import Header from "../../components/header";
import {screenW} from "../../constants";
import {NimSession, NimFriend} from 'react-native-netease-im';
import md5 from "../../utils/md5";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            talks: [
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
                {
                    name: '张三',
                    content: '今天天气不错',
                    time: '09:00',
                },
            ],
        };
    }

    startLogin = async () => {
        const {navigation} = this.props;
        NimSession.login('45', 'e979ba7cca09bf0c93c0a4c166738622"').then(
            (res) => {
                console.log('登录结果', res);
            },
            (err) => {
                console.warn(err);
            },
        );
    }

    renderItem = (rowData) => {
        const {navigation} = this.props;
        const {item, index} = rowData;
        return <TouchableOpacity onPress={() => {
            // this.startLogin()
        }}>

            <View style={styles.talkItem}>
                <Image source={require('../../assets/tab/publish.png')} style={styles.avatar}/>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                </View>
                <View style={{flex: 1}}/>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.line}/>
        </TouchableOpacity>
    };

    componentDidMount() {
        // this.startLogin()
		}
		
		handleAddFriend = () => {
			this.props.navigation.navigate('DigFriend')
		}

    render() {

        const {navigation} = this.props;
        const {talks} = this.state;

        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header 
								{...this.props} 
								noLeft 
								title={'消息'} 
								right={'添加好友'}
								onRightClick={this.handleAddFriend}
							/>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('InteractiveList')
                }}>
                    <View style={styles.headerItem}>
                        <Image source={require('../../assets/tab/publish.png')} style={styles.headerImg}/>
                        <Text style={styles.headerTxt}>互动通知</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ActivityMsgList')
                }}>
                    <View style={styles.headerItem}>
                        <Image source={require('../../assets/tab/publish.png')} style={styles.headerImg}/>
                        <Text style={styles.headerTxt}>活动列表</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('FriendsList')
                }}>
                    <View style={styles.headerItem}>
                        <Image source={require('../../assets/tab/publish.png')} style={styles.headerImg}/>
                        <Text style={styles.headerTxt}>好友列表</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MyFollow')
                }}>
                    <View style={styles.headerItem}>
                        <Image source={require('../../assets/tab/publish.png')} style={styles.headerImg}/>
                        <Text style={styles.headerTxt}>我的关注</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height: 10, width: screenW}}/>
            <FlatList
                data={talks}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item + index}
            />
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: screenW,
        height: 70,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    headerItem: {
        width: screenW / 4,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerImg: {
        width: 38,
        height: 38,
    },
    headerTxt: {
        fontSize: 12,
        marginTop: 8,
    },
    talkItem: {
        backgroundColor: 'white',
        height: 80,
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    content: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999',
        marginTop: 8
    },
    time: {
        marginRight: 20
    },
    avatar: {
        width: 38,
        height: 38,
        marginLeft: 20,
        marginRight: 10
    },
    line: {
        width: screenW,
        height: 1,
        backgroundColor: '#cdcdcd'
    }
});
