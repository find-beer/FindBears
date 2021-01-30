/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-23 19:52:34
 * @LastEditTime : 2021-01-30 17:29:46
 * @FilePath     : /src/pages/home/index.js
 */
import React, { Fragment } from "react";
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { bindState, bindActions, connect } from './../../redux'
import ScrollableTabView from "react-native-scrollable-tab-view";
import CustomTabBar from "../../components/scrollable_tab_bar/CustomTabBar";
import Activities from "./activities";
import Trends from "./trends";
import NotLogin from './../../components/notLogin'
import {
  addLocationListener,
  Geolocation,
  init,
  setNeedAddress,
} from "react-native-amap-geolocation";
import { GetRequest } from "../../utils/request";
const SDK = require("../../../nim/NIM_Web_SDK_rn_v7.2.0.js");
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { userInfo } = nextProps
    return {
      userInfo
    }
  }
  componentDidMount() {
    this.props.setModalLoading(false)
    this.initIM()
  }


  initIM = async () => {
    const { iminfo } = this.props.userInfo
    if (iminfo) {
      const { accid, token } = iminfo
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
    }
  }

  onOfflineMsgs = (options) => {
    console.log('onOfflineMsgs', options)
  }

  onMsg = (options) => {
    console.log('onMsg', options)
  }

  onConnect = () => {
    this.instance.sendText({
      scene: 'p2p',
      to: '80',
      text: 'hello',
      done: (response) => {
        console.log('response --------> done', response)
      }
    })
  }

  loadLocation = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    }
    await setNeedAddress(true);
    await init({
      ios: "5774b9a23bfef933c1a1f24cb81e8311",
      android: "2ed1655dedfd9f3453a54f2ab51a55bd",
    });

    addLocationListener((location) => console.log("---->", location));
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log("定位===>", coords);
      },
      (error) => {
        console.log("定位出错===>", error);
      }
    );
  };

  /**
   * 查询个人信息
   * @returns {Promise<void>}
   */
  getUserInfo = async (flag) => {
    const response = await GetRequest('user/detail', {});
    console.log('用户信息', response);
    if (response.code === 0) {
      if (flag) {
        console.log('------->草稿');
        this.props.navigation.navigate('EditDraft', {"draft": response.data, userType: response.data.userType})
      } else {
        console.log('------->首次');
        this.props.navigation.navigate('PublishActivity', {userType: response.data.userType})
      }
    }
  }

  /**
   * 查询草稿
   */
  queryDraft = async () => {
    const response = await GetRequest("activity/querydraft", {});
    if (response.data) {
      console.log("存在草稿");
      this.getUserInfo(true);
    } else {
      //
      console.log("不存在草稿");
      this.getUserInfo(false);
    }
  };

  toSendMeessage = (account) => {
    this.instance.sendText({
      scene: 'p2p',
      to: `${account}`,
      text: 'hello',
      done: (response) => {
        console.log('response --------> done', response)
      }
    })
  }

  render() {
    const { userInfo } = this.state
    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
        <SafeAreaView style={styles.container}>
          <ScrollableTabView renderTabBar={() => <CustomTabBar />}>
            <View style={styles.container} tabLabel="北京">
              <Trends {...this.props} toSendMeessage={this.toSendMeessage}/>
            </View>
            <View style={styles.container} tabLabel="关系网">
              { userInfo.uid ? <Activities {...this.props}/> : <NotLogin {...this.props}/> }
            </View>
          </ScrollableTabView>
        </SafeAreaView>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fa',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default connect(bindState, bindActions)(Home)