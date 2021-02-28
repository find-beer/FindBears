/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-20 00:04:29
 * @LastEditTime : 2021-02-28 15:57:24
 * @FilePath     : /src/tabNavigation/index.js
 */
import React  from 'react';
import {
  Image,
  StyleSheet,
  
} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./../pages/home";
import Mine from "./../pages/mine/index/index";
import Chat from "./../pages/chat";
import Shoulder from "./../pages/shoulder";
import { TabIcon } from "./../constants";
import TabBar from "./tabBar";


const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabIcon: {
    width: 26,
    height: 26
  }
})

const HomeTabOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({ focused }) => (
    <Image style={styles.tabIcon} source={focused ? TabIcon.homeActive : TabIcon.home } />
  )
}

const ShoulderTabOptions = {
  tabBarLabel: '擦肩',
  tabBarIcon: ({ focused }) => (
    <Image style={styles.tabIcon} source={focused ? TabIcon.shoulderActive : TabIcon.shoulder } />
  )
}

const PublishTabOptions = {
  tabBarLabel: '发布',
  tabBarIcon: () => (
    <Image style={{ width: 80, height: 80 }} source={TabIcon.publish} />
  )
}

const ChatTabOptions = {
  tabBarLabel: '消息',
  tabBarIcon: ({ focused }) => (
    <Image style={styles.tabIcon} source={focused ? TabIcon.chatActive : TabIcon.chat } />
  )
}

const MineTabOptions = {
  tabBarLabel: '我的',
  title: '我的',
  tabBarIcon: ({ focused }) => (
    <Image style={styles.tabIcon} source={focused ? TabIcon.mineActive : TabIcon.mine } />
  )
}

const TabStack = () => (
  <Tab.Navigator 
    lazy={true}
    tabBar={(props) => <TabBar {...props}/>}
    initialRouteName='Home'
  > 
    <Tab.Screen name='Home'     component={Home}     options={HomeTabOptions} />
    <Tab.Screen name='Shoulder' component={Shoulder} options={ShoulderTabOptions} />
    <Tab.Screen name='Publish'  component={Home}     options={PublishTabOptions} />
    <Tab.Screen name='Chat'     component={Chat}     options={ChatTabOptions} />
    <Tab.Screen name='Mine'     component={Mine}     options={MineTabOptions} />
  </Tab.Navigator>
)

export default TabStack