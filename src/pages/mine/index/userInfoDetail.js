/**
 *  我的
 */

import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
const imageUrl = {
  configIcon: require("../../../assets/mine/download-icon.png"),
  avatarBg: require("../../../assets/mine/avatar-bg.png"),
  avatar: require("../../../assets/mine/avatar.jpeg"),
  sexIcon: require("../../../assets/mine/QR-icon.png"),
  netIcon: require("../../../assets/mine/QR-icon.png"),
  hobbyIcon: require("../../../assets/mine/bulb.png"),
  locationIcon: require("../../../assets/mine/local.png"),
  QRCodeIcon: require("../../../assets/mine/QR-icon.png"),
  EditIcon: require("../../../assets/mine/edit.png"),
  done: require("../../../assets/mine/undone-icon.png"),
  wareHouse: require("../../../assets/mine/warehouse-icon.png"),
  unDone: require("../../../assets/mine/undone-icon.png"),
};
import { scaleSize, scaleFont } from "../../../utils/scaleUtil";
import { connect, bindActions, bindState } from './../../../redux'

class UserInfoDetail extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.InfoOuter}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: userInfo.headPicUrl?.replace("https", "http") }}
            style={styles.avatarInner}
          />
        </View>
        <View style={styles.userBox}>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Image source={imageUrl.sexIcon} style={styles.userSex} />
        </View>
        <View style={styles.releationNet}>
          <Text style={styles.netPerson}>关系网人数：</Text>
          <Image source={imageUrl.netIcon} style={styles.netIcon} />
          <Text style={styles.netPersonNum}>{userInfo.allFriendsCount || 0}</Text>
        </View>
        <View style={styles.hobbyWrapper}>
          <View style={styles.hobbyInner}>
            <Image source={imageUrl.hobbyIcon} style={styles.hobbyIcon} />
            {
              userInfo.hobbyTagNameList?.map((item) => {
                  return (
                  <Text style={styles.hobbyItem} key={item}>
                      {item}
                  </Text>
                  );
              })
            }
          </View>
        </View>
        <View style={styles.userProfile}>
          <Image source={imageUrl.locationIcon} style={styles.locationIcon} />
          <Text style={styles.location}>【{userInfo.cityName}】</Text>
          <Text style={styles.profileText}>{userInfo.introduction}</Text>
        </View>
      </View>
    );
  }
}

export default connect(bindState, bindActions)(UserInfoDetail)
const styles = StyleSheet.create({
  InfoOuter: {
    display: "flex",
    alignItems: "center",
  },
  avatarWrapper: {
    width: scaleSize(300),
    height: scaleSize(300),
    borderRadius: scaleSize(150),
    backgroundColor: "#fff",
    marginTop: scaleSize(109),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInner: {
    width: scaleSize(264),
    height: scaleSize(264),
    borderRadius: scaleSize(132),
  },
  userBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleSize(30),
    height: scaleSize(92),
  },
  userName: {
    fontSize: scaleFont(66),
    fontWeight: "bold",
    marginRight: scaleSize(8),
    color: "#fff",
  },
  userSex: {
    width: scaleSize(40),
    height: scaleSize(40),
  },
  releationNet: {
    color: "#FFF",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleSize(13),
    height: scaleSize(50),
  },
  netPerson: {
    fontSize: scaleFont(36),
    color: "#fff",
  },
  netPersonNum: {
    fontSize: scaleFont(42),
    color: "#fff",
  },
  netIcon: {
    width: scaleSize(46),
    height: scaleSize(46),
  },
  hobbyWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  hobbyInner: {
    width: scaleSize(810),
    height: scaleSize(80),
    borderRadius: scaleSize(40),
    borderWidth: scaleSize(3),
    borderColor: "#c2c2c2",
    display: "flex",
    flexDirection: "row",
    paddingLeft: scaleSize(56),
    paddingRight: scaleSize(56),
    backgroundColor: "rgba(204,204,204,.23)",
    marginTop: scaleSize(42),
    alignItems: "center",
  },
  hobbyIcon: {
    width: scaleSize(60),
    height: scaleSize(60),
    marginTop: scaleSize(10),
    marginRight: scaleSize(20),
  },
  hobbyItem: {
    fontSize: scaleFont(32),
    opacity: 0.78,
    color: "#fff",
    marginRight: scaleSize(20),
  },
  userProfile: {
    width: "100%",
    marginTop: scaleSize(50),
    paddingLeft: scaleSize(80),
    paddingRight: scaleSize(80),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  locationIcon: {
    width: scaleSize(22),
    height: scaleSize(32),
    marginRight: scaleSize(10),
  },
  location: {
    fontSize: scaleFont(34),
    color: "#fff",
  },
  profileText: {
    fontSize: scaleFont(36),
    color: "#fff",
  },
});
