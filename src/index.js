/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-19 22:55:47
 * @LastEditTime : 2021-03-06 20:22:54
 * @FilePath     : /src/index.js
 */
import React from 'react';
import { Image, TouchableOpacity } from 'react-native'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react'
import TabStack from './tabNavigation'
import createStore from './redux/store'
import Login from './pages/account/login'
import Publish from './components/publish'
import PublishActive from './pages/publish/active'
import ModalLoading from './components/modalLoading'
import Loading from './components/loading'
//============================================

import Splash from "./pages/splash";
import Relations from "./pages/home/relations";
import PublishTrend from "./pages/publish/publishTrend";


import Register from "./pages/account/register";



import Hobby from "./pages/account/hobby";
import QrCode from "./pages/mine/qrCode";
import Store from "./pages/mine/store";
import StoreList from "./pages/mine/storeList";
import EditInfo from "./pages/mine/editInfo";
import Setting from "./pages/mine/setting";
import OrderList from "./pages/mine/orderList";
import ActivityDetail from "./pages/home/activity_detail";
import AddTicket from "./pages/home/add_ticket";
import TicketSelect from "./pages/home/ticket_select";
import Pay from "./pages/home/pay";
import ActivityList from "./pages/shoulder/activity_list";
import DynamicDetail from "./pages/home/dynamic_detail/index";
import ModifyTicket from "./pages/home/modify_ticket";
import Tickets from "./pages/home/tickets";
import InteractiveList from "./pages/chat/interactive";
import DigFriend from "./pages/chat/dig_friends";
import FriendsList from "./pages/chat/FriendsList";
import MyFollow from "./pages/chat/MyFollow";
import FansList from "./pages/chat/FansList";
import ActivityMsgList from "./pages/chat/activity_list";
import EditDraft from "./pages/publish/editDraft";
import StrangerInfo from "./pages/strangerInfo";
import RelationChain from "./pages/relationChain";
import LocalTickets from "./pages/home/local_tickets";
import LocalAddTicket from "./pages/home/local_add_ticket";
import LocalModifyTicket from "./pages/home/local_modify_ticket";

/**
 * App主堆栈
 */
const MainStack = () => {
  const Stack = createStackNavigator()
  const defautOptions = {
    headerBackImage: () => (
      <Image style={{ width: 30, height: 30 }}source={require('./assets/mine/arrow_left.png')} />
    ),
    headerBackTitleVisible: false
  }
  return (
    <Stack.Navigator headerMode='float'>
      <Stack.Screen name='Tab' component={TabStack}  options={{ headerShown: false, headerTitleAlign: 'center' }}/>
      {/* ========================================================== */}
      <Stack.Screen options={{ ...defautOptions, title: '支付' }}    name='Pay'                component={Pay}/>
      <Stack.Screen options={{ ...defautOptions, title: '爱好' }}    name='Hobby'              component={Hobby}/>
      <Stack.Screen options={{ ...defautOptions, title: '仓库' }}    name='Store'              component={Store}/>
      <Stack.Screen options={{ ...defautOptions, title: '我的二维码' }}  name='QrCode'             component={QrCode}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='Splash'             component={Splash}/>
      <Stack.Screen options={{ ...defautOptions, title: '票' }}      name='Tickets'            component={Tickets}/>
      <Stack.Screen options={{ ...defautOptions, title: '设置' }}    name='Setting'            component={Setting}/>
      <Stack.Screen options={{ ...defautOptions, title: '我的关注' }}    name='MyFollow'           component={MyFollow}/>
      <Stack.Screen options={{ ...defautOptions, title: '我的粉丝' }}    name='FansList'           component={FansList}/>
      <Stack.Screen options={{ ...defautOptions, title: '编辑资料' }}    name='EditInfo'           component={EditInfo}/>
      <Stack.Screen options={{ ...defautOptions, title: '订单列表' }}    name='OrderList'          component={OrderList}/>
      <Stack.Screen options={{ ...defautOptions, title: '关系链' }}    name='Relations'          component={Relations}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='EditDraft'          component={EditDraft}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='StoreList'          component={StoreList}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='AddTicket'          component={AddTicket}/>
      <Stack.Screen options={{ ...defautOptions, title: '挖好友' }}    name='DigFriend'          component={DigFriend}/>
      <Stack.Screen options={{ ...defautOptions, title: '好友列表' }}    name='FriendsList'        component={FriendsList}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='LocalTickets'       component={LocalTickets}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='ModifyTicket'       component={ModifyTicket}/>
      <Stack.Screen options={{ ...defautOptions, title: '用户信息' }}    name='StrangerInfo'       component={StrangerInfo}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='PublishTrend'       component={PublishTrend}/>
      <Stack.Screen options={{ ...defautOptions, title: '选择票种' }}    name='TicketSelect'       component={TicketSelect}/>
      <Stack.Screen options={{ ...defautOptions, title: '活动列表' }}    name='ActivityList'       component={ActivityList}/>
      <Stack.Screen options={{ ...defautOptions, title: '关系链' }}    name='RelationChain'      component={RelationChain}/>
      <Stack.Screen options={{ ...defautOptions, title: '动态详情' }}    name='DynamicDetail'      component={DynamicDetail}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='LocalAddTicket'     component={LocalAddTicket}/>
      <Stack.Screen options={{ ...defautOptions, title: '活动详情' }}    name='ActivityDetail'     component={ActivityDetail}/>
      <Stack.Screen options={{ ...defautOptions, title: '互动通知' }}    name='InteractiveList'    component={InteractiveList}/>
      <Stack.Screen options={{ ...defautOptions, title: '活动列表' }}    name='ActivityMsgList'    component={ActivityMsgList}/>
      <Stack.Screen options={{ ...defautOptions, title: '' }}    name='LocalModifyTicket'  component={LocalModifyTicket}/>
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Login'     component={Login}/>
      <Stack.Screen name='Register'  component={Register}/>
    </Stack.Navigator>
  )
}

export default () => {
  const { store, persistor } = createStore()
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none' mode='modal'>
            <Stack.Screen name='Main'     component={MainStack}/>
            <Stack.Screen name='Auth'     component={AuthStack}/>
            <Stack.Screen name='PublishActive'   component={PublishActive}/>
          </Stack.Navigator>
        </NavigationContainer>
        <ModalLoading />
        <Publish />
    </Provider>
  )
}