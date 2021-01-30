/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:54:57
 * @LastEditTime : 2021-01-23 13:03:19
 * @FilePath     : /src/App.js
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import RootApp from "./RootApp";
import PublishDialog from "./components/publish_dialog/PublishDialog";
import { LogBox, View } from "react-native";
import SelectItemsDialog from "./components/select_dialog/SelectItemsDialog";
import { GetRequest } from "./utils/request";

LogBox.ignoreAllLogs(true);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  getUserInfo = async () => {
    const response = await GetRequest("user/detail", {});
    console.log("用户信息", response);
    this.setState({
      user: response.data,
    });
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootApp />
        <PublishDialog
          user={this.state.user}
          ref={(ref) => (global.publishDialog = ref)}
        />
        <SelectItemsDialog
          itemKey="value"
          ref={(ref) => (global.selectItemsDialog = ref)}
          onPress={(which) => {}}
        />
      </View>
    );
  }
}
