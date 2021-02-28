/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import ActivityItem from "./item.js";
import { scaleFont, scaleSize } from "../../utils/scaleUtil";
import { GetRequest } from "../../utils/request";
import EventBus from "../../utils/EventBus";
import { bindActions, bindState, connect } from "./../../redux";
class Shoulder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "shortActivity",
      longActivity: [],
      shortActivity: [],
      titleList: [
        "周边游",
        "电影演出",
        "轰趴桌游",
        "户外活动",
        "游乐园",
        "沉浸式娱乐",
        "文化体验",
        "新奇探索",
      ],
    };
  }

  componentDidMount() {
    this.initData();
    EventBus.on("REFRESH_SHOULDER", this.initData());
  }
  changeTab(type) {
    this.setState({
      currentTab: type,
    });
  }

  initData() {
    // 短期
    GetRequest("activity/activities", {
      activityValid: 0,
      pageSize: 300,
      pageNum: 1,
      activityType: -1,
    }).then((res) => {
      this.setState({
        longActivity: res.data || [],
      });
    });

    // 长期
    GetRequest("activity/activities", {
      activityValid: 1,
      pageSize: 300,
      pageNum: 1,
      activityType: -1,
    }).then((res) => {
      this.setState({
        shortActivity: res.data || [],
      });
    });
  }

  goDetail(type) {
    this.props.navigation.navigate("ActivityList", {
      type,
      title: this.state.titleList[type - 1],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
        <SafeAreaView />
            <View style={styles.searchContainer}>
              <TextInput placeholder='请输入你想去的地方' style={styles.searchHint}></TextInput>
            </View>
            <ScrollView>
            <View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => this.goDetail(1)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/travel-around.png")}
                        />
                        <Text style={styles.txtMenu}>周边游</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goDetail(2)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/movie.png")}
                        />
                        <Text style={styles.txtMenu}>电影演出</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goDetail(3)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/Cartagena.png")}
                        />
                        <Text style={styles.txtMenu}>轰趴桌游</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goDetail(4)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/outdoor.png")}
                        />
                        <Text style={styles.txtMenu}>户外活动</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => this.goDetail(5)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/amusement-park.png")}
                        />
                        <Text style={styles.txtMenu}>游乐园</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goDetail(6)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/game.png")}
                        />
                        <Text style={styles.txtMenu}>沉浸式娱乐</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goDetail(7)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/cultural.png")}
                        />
                        <Text style={styles.txtMenu}>文化体验</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goDetail(8)}>
                        <View style={styles.item}>
                        <Image
                            style={styles.imgMenu}
                            source={require("../../assets/activities/explore.png")}
                        />
                        <Text style={styles.txtMenu}>新奇探索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabWrapper}>
                    <View style={styles.tabHeader}>
                        <View style={styles.tabItem}>
                        <Text
                            style={
                            this.state.currentTab === "shortActivity"
                                ? [styles.tabText, styles.tabTextActive]
                                : styles.tabText
                            }
                            onPress={() => this.changeTab("shortActivity")}
                        >
                            短期
                        </Text>
                        {this.state.currentTab === "shortActivity" ? (
                            <View style={styles.tabBar} />
                        ) : null}
                        </View>
                        <View style={styles.tabItem}>
                        <Text
                            style={
                            this.state.currentTab === "longActivity"
                                ? [styles.tabText, styles.tabTextActive]
                                : styles.tabText
                            }
                            onPress={() => this.changeTab("longActivity")}
                        >
                            长期
                        </Text>
                        {this.state.currentTab === "longActivity" ? (
                            <View style={styles.tabBar} />
                        ) : null}
                        </View>
                    </View>
                </View>
                <View style={styles.list_wrapper}>
                    {this.state[this.state.currentTab].map((item) => {
                        return (
                        <ActivityItem item={item} key={item.id} {...this.props} />
                        );
                    })}
                </View>
            </View>
            </ScrollView>
        </View>
    );
  }
}

export default connect(bindState, bindActions)(Shoulder);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    height: 64,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  searchHint: {
    height: 44,
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f6f7fa',
    color: "#888889",
    borderRadius: 44,
    marginLeft: 16,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: '#fff'
  },
  imgMenu: {
    width: 40,
    height: 40,
  },
  txtMenu: {
    color: "#999",
  },
  item: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  tabHeader: {
    paddingLeft: scaleSize(357),
    paddingRight: scaleSize(357),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scaleSize(30),
    backgroundColor: '#fff'
  },
  tabItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: scaleSize(130),
  },
  tabText: {
    fontSize: scaleFont(42),
    color: "#999",
  },
  tabTextActive: {
    fontSize: scaleFont(48),
    color: "#564f5f",
  },
  tabBar: {
    width: scaleSize(50),
    height: scaleSize(4),
    borderRadius: scaleSize(2),
    backgroundColor: "#564f5f",
    marginTop: scaleSize(10),
    marginLeft: scaleSize(20),
  },
  list_wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
});
