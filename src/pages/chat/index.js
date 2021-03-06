/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeAppEventEmitter,
} from "react-native";
import Header from "../../components/header";
import { screenW } from "../../constants";
import { bindActions, bindState, connect } from "./../../redux";
const SDK = require("../../../nim/NIM_Web_SDK_rn_v7.2.0.js");
import md5 from "../../utils/md5";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      talks: [
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
        {
          name: "张三",
          content: "今天天气不错",
          time: "09:00",
        },
      ],
    };
  }

  //   startLogin = async () => {
  //     const { navigation } = this.props;
  //     NimSession.login("45", 'e979ba7cca09bf0c93c0a4c166738622"').then(
  //       (res) => {
  //       },
  //       (err) => {
  //         console.warn(err);
  //       }
  //     );
  //   };

  onConnect = (options) => {
    this.instance.applyFriend({
        account: 'mjx',
        ps: 'sdjfsjdfsjdf',
        done: this.applyFriendDone
    })
  };

  onWillReconnect = (options) => {
  };

  onDisconnect = (options) => {
  };

  onError = (options) => {
  };

  onRoamingMsgs = (options) => {
  };

  onOfflineMsgs = (options) => {
  };

  onMsg = (msg) => {
  };

  initChat = () => {
    const { iminfo } = this.props.userInfo;
    const { accid, token } = iminfo;
    this.instance = SDK.NIM.getInstance({
      debug: true,
      appKey: "67b35e65c41efd1097ef8504d5a88455",
      token,
      account: accid,
      db: false, // 不使用数据库
      onconnect: this.onConnect,
      onwillreconnect: this.onWillReconnect,
      ondisconnect: this.onDisconnect,
      onerror: this.onError,
      onroamingmsgs: this.onRoamingMsgs,
      onofflinemsgs: this.onOfflineMsgs,
      onmsg: this.onMsg,
    });
  };

  applyFriendDone = (error, options) => {
  }

  renderItem = (rowData) => {
    const { navigation } = this.props;
    const { item, index } = rowData;
    return (
      <TouchableOpacity>
        <View style={styles.talkItem}>
          <Image
            source={require("../../assets/tab/publish.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.line} />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    // this.startLogin()
    this.initChat();
  }

  onRightClick = () => {

  }
  
  toPage = (route) => {
    this.props.navigation.navigate(route)
  }
  render() {
    const { navigation } = this.props;
    const { talks } = this.state;
    return (
      <Fragment>
        <SafeAreaView style={{ backgroundColor: "white" }} />
        <Header {...this.props} noLeft title={"消息"} right={"添加好友"} onRightClick={this.onRightClick}/>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.toPage('InteractiveList')}>
            <View style={[styles.headerItem, styles.notify]}>
              <Image source={require("../../assets/chat/bell.png")} style={styles.headerImg} />
              <Text style={styles.headerTxt}>互动通知</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toPage("ActivityMsgList")} >
            <View style={[styles.headerItem, styles.activityList]}>
              <Image source={require("../../assets/chat/balloon.png")} style={styles.headerImg} />
              <Text style={styles.headerTxt}>活动列表</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toPage("FriendsList") }>
            <View style={[styles.headerItem, styles.friendList]}>
              <Image source={require("../../assets/chat/friendList.png")} style={styles.headerImg} />
              <Text style={styles.headerTxt}>好友列表</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toPage("MyFollow")}>
            <View style={[styles.headerItem, styles.attention]}>
              <Image source={require("../../assets/tab/publish.png")} style={styles.headerImg} />
              <Text style={styles.headerTxt}>我的关注</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 10, width: screenW }} />
        <FlatList
          data={talks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item + index}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 130,
    flexDirection: "row",
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 20
  },
  headerItem: {
    flex: 1,
    height: 133,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  notify: {
    backgroundColor: '#F36968'
  },
  activityList: {
    backgroundColor: '#6AD8AF'
  },
  friendList: {
    backgroundColor: '#62A6FC'
  },
  attention: {
    backgroundColor: '#7463F6'
  },
  headerImg: {
    width: 38,
    height: 38,
  },
  headerTxt: {
    fontSize: 12,
    marginTop: 8,
    color: '#fff'
  },
  talkItem: {
    backgroundColor: "white",
    height: 80,
    width: screenW,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
    marginTop: 8,
  },
  time: {
    marginRight: 20,
  },
  avatar: {
    width: 38,
    height: 38,
    marginLeft: 20,
    marginRight: 10,
  },
  line: {
    width: screenW,
    height: 1,
    backgroundColor: "#cdcdcd",
  },
});

export default connect(bindState, bindActions)(Chat);
