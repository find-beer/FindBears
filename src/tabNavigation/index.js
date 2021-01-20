/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-20 00:04:29
 * @LastEditTime : 2021-01-21 00:31:00
 * @FilePath     : /src/tabNavigation/index.js
 */
import React  from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./../pages/home";
import Mine from "./../pages/mine/index/index";
import Chat from "./../pages/chat";
import Shoulder from "./../pages/shoulder";
import { TabIcon } from "./../constants";
import TabBar from "./tabBar";


const Tab = createBottomTabNavigator();

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
    <TouchableOpacity onPress={() => global.publishDialog.show(() => {}, {})}>
      <Image style={{ width: 70, height: 70 }} source={TabIcon.publish} />
    </TouchableOpacity>
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
  tabBarIcon: ({ focused }) => (
    <Image style={styles.tabIcon} source={focused ? TabIcon.mineActive : TabIcon.mine } />
  )
}

const tabBarOptions =  {
  allowFontScaling: false,
  activeTintColor: '#2961FD', // 选中项的颜色
  inactiveTintColor: '#808080', // 未选中项的颜色
  header: 'none'
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 26,
    height: 26
  }
})

const TabStack = () => (
  <Tab.Navigator 
    tabBarOptions={tabBarOptions} 
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