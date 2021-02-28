/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-20 00:04:33
 * @LastEditTime : 2021-02-28 15:33:57
 * @FilePath     : /src/tabNavigation/tabBar.js
 */
import React, { useState, useEffect }from "react";
import { 
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import posed from "react-native-pose"; // react-native 动画库
import { bindActions, bindState, connect } from './../redux/index'
import DeviceInfo from 'react-native-device-info';
const Scaler = posed.View({
  // 定义点击缩放
  active: { scale: 1 },
  inactive: { scale: 0.8 },
});

const TabBar = (props) => {
  const {
    activeTintColor,
    inactiveTintColor,
    navigation,
    descriptors,
    state,
  } = props;
  const { routes } = state;
  const [ userInfo, setUserInfo ] = useState({})
  const isiPhone = Platform.OS === 'ios'
  useEffect(() => {
    setUserInfo(props.userInfo)
    props.setRouteNavigation(navigation)
  }, [props.userInfo])

  return (
    <Scaler style={Styles.container}>
      {
        routes.map((route, routeIndex) => {
          const { options } = descriptors[route.key];
          const focused = state.index === routeIndex;
          const tintColor = focused ? activeTintColor : inactiveTintColor;
          const isPublish = route.name === "Publish";
          const onPress = () => {
            // 触发tab的默认事件
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            /**
             * 判断当前用户点击的是否时发布tab或我的页面
             * 如果时发布tab触发显示Modal的action
             * 如果时我的页面需要判断用户是否登录
             */
            if (!focused && !event.defaultPrevented && !isPublish ) {
              if ((route.name === 'Mine' || route.name === 'Chat') && !userInfo.uid) {
                // 如果用户未登录则直接跳转登录页面
                navigation.navigate('Auth', { screen: 'Login' } );
              } else {
                console.log('route.name', route.name)
                navigation.navigate(route.name);
              }
            } else if (isPublish) {
              // 如果点击的时发布按钮，则直接触发显示Modal的action
              props.setPublishModal(true)
            }
          };

        return (
          <TouchableNativeFeedback key={route.key} onPress={onPress} style={Styles.tabButton}>
            <Scaler style={ isPublish ? Styles.scalerOnline : Styles.scaler }  pose={ focused ? "active" : "inactive" }>
              { options.tabBarIcon({ focused, tintColor, route }) }
              {
                isPublish
                ? <View style={{ height: 20 }} /> 
                : <Text style={focused ? Styles.iconText : Styles.iconTextGray}> {options.tabBarLabel}</Text>
              }
            </Scaler>
          </TouchableNativeFeedback>
        );
      })}
    </Scaler>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    // paddingBottom: 22,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "white",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scaler: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scalerOnline: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconText: {
    fontSize: 12,
    lineHeight: 20,
  },
  iconTextGray: {
    fontSize: 12,
    lineHeight: 20,
    color: "#cdcdcd",
  },
});

export default connect(bindState, bindActions)(TabBar);
