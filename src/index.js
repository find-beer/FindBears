/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-19 22:55:47
 * @LastEditTime : 2021-01-20 00:22:43
 * @FilePath     : /src/index.js
 */
import React  from 'react';
import {
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./pages/home";
import TabBar from "./tabNavigation/tabBar";
import { TabIcon } from "./constants";
import Mine from "./pages/mine/index/index";
import Chat from "./pages/chat";
import Shoulder from "./pages/shoulder";
import createStore from './redux/store'

import PublishDialog from "./components/publish_dialog/PublishDialog";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const HomeTabOptions = {
  tabBarLabel: '首页',
  tabBarIcon: ({ focused }) => <Image style={{ width: 26, height: 26 }} source={focused ? TabIcon.homeActive : TabIcon.home } />
}

const ShoulderTabOptions = {
  tabBarLabel: '擦肩',
  tabBarIcon: ({ focused }) => <Image style={{ width: 26, height: 26 }} source={focused ? TabIcon.shoulderActive : TabIcon.shoulder } />
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
  tabBarIcon: ({ focused }) => <Image style={{ width: 26, height: 26 }} source={focused ? TabIcon.chatActive : TabIcon.chat } />
}

const MineTabOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ focused }) => <Image style={{ width: 26, height: 26 }} source={focused ? TabIcon.mineActive : TabIcon.mine } />
}
const tabBarOptions =  {
  allowFontScaling: false,
  activeTintColor: '#2961FD', // 选中项的颜色
  inactiveTintColor: '#808080', // 未选中项的颜色
}

const TabStack = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions} tabBar={TabBar}> 
    <Tab.Screen name='Home'     component={Home}     options={HomeTabOptions} />
    <Tab.Screen name='Shoulder' component={Shoulder} options={ShoulderTabOptions} />
    <Tab.Screen name='Publish'  component={Home}     options={PublishTabOptions} />
    <Tab.Screen name='Chat'     component={Chat}     options={ChatTabOptions} />
    <Tab.Screen name='Mine'     component={Mine}     options={MineTabOptions} />
  </Tab.Navigator>
)

const MainStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Tab' component={TabStack} />
    </Stack.Navigator>
  </NavigationContainer>
)

const App = () => {
  const store = createStore()
  return (
    <Provider store={store}>
      <MainStack/>
    </Provider>
  )
}
export default () => (
  <View style={{ flex: 1 }}>
    <App />
    <PublishDialog
      ref={ref => global.publishDialog = ref}
    />
  </View>
)