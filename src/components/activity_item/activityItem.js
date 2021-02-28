/**
 *  活动item
 */
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenW } from "../../utils/screenUtil";
import { scaleSize, scaleFont } from "../../utils/scaleUtil";
import { getDate } from "../../utils/date";
import { connect, bindActions, bindState } from "../../redux";
const imageUrl = { relation: require("../../assets/home/relationline.png") };
const defaultAvatr = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1817066819,1530157012&fm=11&gp=0.jpg'
class ActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userInfo.uid,
    };
  }

  handlegoStrangerPage() {
    this.props.navigation.navigate("StrangerInfo", {
      uid: this.props.activity?.userVO?.userId || "",
    });
  }
  // 关系链
  handleGoLine() {
    this.props.navigation.navigate("RelationChain", {
      uid: this.props.activity?.userVO?.userId || "",
    });
  }
  render() {
    const { activity = {}, onBtnClick } = this.props;
    const { picUrl } = activity
    const avatar = picUrl || defaultAvatr
    return (
      <View style={styles.itemContainer}>
        <View style={styles.cards}>
          <View style={styles.outs}>
            <TouchableOpacity onPress={() => this.handlegoStrangerPage()}>
              <Image source={{ uri: avatar }} style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.publisher}>{activity.userVO.userName}</Text>
              <View style={styles.right}>
                <Text style={styles.topTxt}>
                  {activity ? activity.activityAddress : "城市名称"}
                </Text>
                <View style={styles.shu} />
                <Text style={styles.topTxt}>
                  {activity ? getDate(activity.publishTime) : "发布时间"}
                </Text>
                <View style={styles.shu} />
                <Text style={styles.topTxt}>
                  {activity ? activity.memberCount : "0"}人参与
                </Text>
              </View>
            </View>
            {this.props.userId !== activity.userVO.userId ? (
              <TouchableOpacity onPress={() => this.handleGoLine()}>
                <View style={styles.relationLine}>
                  <Image source={imageUrl.relation} style={styles.btn} />
                  <Text style={styles.btnText}>关系链</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <Text numberOfLines={1} style={styles.name}>
            {activity ? activity.activityTitle : "标题暂无"}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <View style={styles.tag} />
            <Text style={styles.timeLeft}>活动时间：</Text>
            <Text numberOfLines={1} style={styles.time}>
              {activity ? activity.activityTime : "时间待定"}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.tag} />
            <Text style={styles.cityLeft}>活动地点：</Text>
            <Text numberOfLines={1} style={styles.city}>
              {activity ? activity.cityName : "地点暂无"}
            </Text>
          </View>
          <TouchableOpacity onPress={onBtnClick}>
            <View style={styles.goToDetail}>
              <Text style={styles.text}>查看活动详情 {`>>`}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.sep} />
      </View>
    );
  }
}
export default connect(bindState, bindActions)(ActivityItem);
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10
  },
  goToDetail: {
    backgroundColor: "#564F5F",
    borderRadius: scaleSize(46),
    width: screenW - 54,
    height: scaleSize(100),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: scaleSize(54),
  },
  text: {
    fontSize: scaleSize(36),
    color: "#FFFFFF",
  },
  outs: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  avatar: { width: 66, height: 66, borderRadius: 33 },
  publisher: { fontSize: 18, color: "#564F5F", fontWeight: "400" },
  right: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  upName: {
    width: 3,
    height: 15,
    backgroundColor: "#8E79FE",
    marginRight: 5,
    borderRadius: 5,
  },
  con: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shu: {
    width: 1,
    height: 12,
    backgroundColor: "#999999",
    marginLeft: 3,
    marginRight: 3,
  },
  cards: {
    width: screenW - 27,
    marginLeft: 14,
    marginTop: 13,
    marginBottom: 13,
    justifyContent: "center",
    paddingBottom: 30,
    paddingTop: 30,
  },
  topTxt: {
    fontSize: 12,
    color: "#999999",
  },
  cardTop: {
    height: 50,
    width: (screenW - 54) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  down: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  rightCon: {
    width: 3,
    height: 12,
    backgroundColor: "white",
    marginRight: 5,
  },
  sep: {
    width: screenW,
    height: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 12,
  },
  values: {
    width: 60,
  },
  name: {
    marginLeft: 27,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 8,
    color: "#564F5F",
    marginBottom: 5,
  },
  time: {
    marginLeft: 5,
    fontSize: 16,
    marginTop: 8,
    color: "#564F5F",
  },
  timeLeft: {
    marginLeft: 5,
    fontSize: 16,
    marginTop: 8,
    color: "#564F5F",
  },
  cityLeft: {
    marginLeft: 5,
    fontSize: 16,
    marginTop: 8,
    color: "#564F5F",
  },
  city: {
    marginLeft: 5,
    fontSize: 16,
    marginTop: 8,
    color: "#564F5F",
  },
  tag: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 2,
    width: scaleSize(12),
    height: scaleSize(32),
    backgroundColor: "#8E79FE",
    borderRadius: scaleSize(7),
  },
  relationLine: {
    width: scaleSize(222),
    height: scaleSize(92),
    position: "relative",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: scaleSize(222),
    height: scaleSize(92),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  btnText: {
    fontSize: scaleFont(35),
    color: "#fff",
  },
});
