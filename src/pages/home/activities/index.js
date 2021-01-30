/*
 * @Descripttion :
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:57:04
 * @LastEditTime : 2021-01-30 17:32:32
 * @FilePath     : /src/pages/home/activities/index.js
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import ActivityItem from "../../../components/activity_item/activityItem";
import DynamicItem from "../../../components/dynamic_item/dynamicItem";
import { bindActions, bindState, connect } from "./../../../redux";

import Toast from "./../../../utils/toast";

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relationDetailList: [],
      isRefreshing: false,
      userInfo: props.userInfo,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { userInfo } = nextProps;
    return {
      userInfo,
    };
  }

  componentDidMount() {
    this.getData();
    console.log('this.props', this.props)
  }

  renderItem = (rowData) => {
    const activity = rowData.item.activityDetailVO;
    const feed = rowData.item.feedDetailVO;
    const { navigation } = this.props;
    if (activity) {
      return (
        <ActivityItem
          onBtnClick={() =>
            navigation.navigate("ActivityDetail", {
              id: activity.id,
              refresh: () => this.getData(),
            })
          }
          {...this.props}
          activity={activity}
          userId={this.state.userId}
        />
      );
    }
    if (feed) {
      return (
        <DynamicItem {...this.props} feed={feed} userId={this.state.userId} />
      );
    }
  };

  getData = async () => {
    const { success, data, msg } = await this.props.get("/user/relationfeed", {
      limit: 500,
      feedOffsetId: 0,
      activityOffsetId: 0,
    });
    if (success) {
      return this.setState({
        relationDetailList: data.relationDetailList,
      });
    }
    Toast.toast("查询失败，请重试");
  };

  

  render() {
    const { relationDetailList, isRefreshing, userInfo } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={relationDetailList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item + index}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default connect(bindState, bindActions)(Activities);
