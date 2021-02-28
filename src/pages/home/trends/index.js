/*
 * @Descripttion :
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:57:04
 * @LastEditTime : 2021-02-28 13:00:39
 * @FilePath     : /src/pages/home/trends/index.js
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { FlatList, StyleSheet, View, RefreshControl, Text } from "react-native";
import FeedItem from "./feedItem.js";
import Toast from "../../../utils/toast";
import { bindActions, bindState, connect } from "./../../../redux";
import NoData from "./../../../components/noData";
import Button from './../../../components/button'

class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedDetailVOList: [],
      isRefreshing: false,
      loginUid: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  renderItem = (rowData) => {
    return (
      <FeedItem
        {...this.props}
        loginUid={this.state.loginUid}
        data={rowData.item}
        key={rowData.item.id}
      />
    );
  };

  getData = async () => {
    try {
      const payload = {
        random: 0,
        limit: 500,
        offsetId: 0,
        location: "123.18152,41.269402",
      }
      const { success, data } = await this.props.get("/feed/feeds", payload);
      if (success) {
        return this.setState({ feedDetailVOList: data.feedDetailVOList });
      }
      Toast.toast("查询失败，请重试");
    } catch (e) {
      Toast.toast("查询失败，请重试");
    }
  };
  toSendMeessage = (account) => {
    this.props.toSendMeessage(account)
  }
  
  render() {
    const { feedDetailVOList, isRefreshing } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={feedDetailVOList}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          ListEmptyComponent={NoData}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.getData}
            />
          }
        />
      </View>
    );
  }
}
export default connect(bindState, bindActions)(Trends);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 30,
    width: 50,
    backgroundColor: '#f6f7fa',
    borderRadius : 10
  },
  list: {
    flex: 1,
  },
});
