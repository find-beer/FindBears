/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-20 00:04:33
 * @LastEditTime : 2021-01-20 00:17:06
 * @FilePath     : /src/tabNavigation/tabBar.js
 */
import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import posed from "react-native-pose"; // react-native 动画库

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
  console.log("props", props);
  const { routes } = state;
  return (
    <Scaler style={Styles.container}>
      {routes.map((route, routeIndex) => {
        const { options } = descriptors[route.key];
        const focused = state.index === routeIndex;
        const tintColor = focused ? activeTintColor : inactiveTintColor;
        const isPublish = route.name === "Publish";
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented && !isPublish ) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableNativeFeedback key={route.key} onPress={onPress} style={Styles.tabButton}>
            <Scaler style={ isPublish ? Styles.scalerOnline : Styles.scaler }  pose={ focused ? "active" : "inactive" }>
              { options.tabBarIcon({ focused, tintColor, route }) }
              {
                isPublish
                ? <View style={{ height: 28 }} /> 
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
    height: 70,
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
  spotLight: {
    // width: scw,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  spotLightInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
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

export default TabBar;
