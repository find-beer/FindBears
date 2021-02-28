/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Header from "../../../components/header/index";
import { GetRequest } from "../../../utils/request";
import { screenW } from "../../../constants";
import { RichEditor } from "react-native-pell-rich-editor";
import { connect, bindActions, bindState } from "./../../../redux";

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route.params.id,
      data: {
        activityTitle: "",
        activityTime: "",
        activityAddress: "",
        memberCount: 0,
        content: "",
        userType: 0,
      },
    };
  }

  componentWillUnmount() {
    this.props.navigation.goBack();
  }

  requireDeviceData = async () => {
    const { id } = this.state;

    const { success, data } = await this.props.get("activity/activity/detail", { id });
    console.log('data ------> ', data)
    if (success) {
        this.setState({ data });
    }
  };

  componentDidMount() {
    this.requireDeviceData();
  }

  joinTalk = () => {};

  confirmParticipate = () => {};

  immeJoin = () => {
    const { data } = this.state;
    if (data.userType === 0) {
      Alert.alert("是否要报名？", "", [{
          text: "取消",
        },{
          text: "确认",
          style: "destructive",
          onPress: () => {
            this.confirmParticipate();
          },
        },
      ]);
    } else {
      this.props.navigation.navigate("TicketSelect", { data });
    }
  };

  render() {
      console.log('this.state', this.state.data)
    const {
      activityTitle,
      activityTime,
      activityAddress,
      memberCount,
      content,
    } = this.state.data;
    return (
      <Fragment>
        <SafeAreaView style={{ backgroundColor: "#fff" }} />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.left}>【活动名称】</Text>
                <Text style={styles.right}>{activityTitle}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>【活动时间】</Text>
                <Text style={styles.right}>
                  {activityTime ? activityTime : "时间待定"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>【活动地点】</Text>
                <Text style={styles.right}>{activityAddress}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.left}>【参与人数】</Text>
                <Text style={styles.right}>{memberCount}</Text>
              </View>
            </View>
            <RichEditor disabled initialContentHTML={content} />
          </View>
        </ScrollView>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={this.joinTalk}>
            <View style={styles.draft}>
              <Text style={styles.txt}>加入群聊</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.immeJoin}>
            <View style={styles.publish}>
              <Text style={styles.txt}>立即报名</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}
export default connect(bindState, bindActions)(ActivityDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draft: {
    height: 60,
    width: screenW / 2,
    backgroundColor: "#cdcdcd",
    alignItems: "center",
    justifyContent: "center",
  },
  publish: {
    height: 60,
    width: screenW / 2,
    backgroundColor: "#564F5F",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: { color: "white", fontSize: 16 },
  left: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  right: {
    fontSize: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  card: {
    // elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    // shadowColor: '#cdcdcd',  //  阴影颜色
    // shadowOffset: {width: 0, height: 0},  // 阴影偏移
    // shadowOpacity: 1,  // 阴影不透明度
    // width: screenW - 32,
    // marginLeft: 16,
    // borderRadius: 10,
    backgroundColor: "white",
    height: 150,
    // marginTop: 12,
    // marginBottom: 12,
    justifyContent: "center",
    paddingLeft: 16,
  },
});
