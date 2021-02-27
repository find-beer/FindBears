/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-19 22:55:47
 * @LastEditTime : 2021-02-23 22:59:00
 * @FilePath     : /src/index.js
 */
import React from 'react';
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
import Config from "./pages/mine/config";
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
  return (
    <Stack.Navigator headerMode='float'>
      <Stack.Screen name='Tab' component={TabStack}  options={{ headerShown: false }}/>
      {/* ========================================================== */}
      <Stack.Screen name='Splash'   component={Splash}/>
      <Stack.Screen name='Relations'   component={Relations}/>
      <Stack.Screen name='PublishTrend'   component={PublishTrend}/>
      <Stack.Screen name='Hobby'   component={Hobby}/>
      <Stack.Screen name='QrCode'   component={QrCode}/>
      <Stack.Screen name='Store'   component={Store}/>
      <Stack.Screen name='StoreList'   component={StoreList}/>
      <Stack.Screen name='EditInfo'   component={EditInfo}/>
      <Stack.Screen name='Config'   component={Config}/>
      <Stack.Screen name='OrderList'   component={OrderList}/>
      <Stack.Screen name='ActivityDetail'   component={ActivityDetail}/>
      <Stack.Screen name='AddTicket'   component={AddTicket}/>
      <Stack.Screen name='TicketSelect'   component={TicketSelect}/>
      <Stack.Screen name='Pay'   component={Pay}/>
      <Stack.Screen name='ActivityList'   component={ActivityList}/>
      <Stack.Screen name='DynamicDetail'   component={DynamicDetail}/>
      <Stack.Screen name='Tickets'   component={Tickets}/>
      <Stack.Screen name='ModifyTicket'   component={ModifyTicket}/>
      <Stack.Screen name='InteractiveList'   component={InteractiveList}/>
      <Stack.Screen name='DigFriend'   component={DigFriend}/>
      <Stack.Screen name='FriendsList'   component={FriendsList}/>
      <Stack.Screen name='MyFollow'   component={MyFollow}/>
      <Stack.Screen name='FansList'   component={FansList}/>
      <Stack.Screen name='ActivityMsgList'   component={ActivityMsgList}/>
      <Stack.Screen name='EditDraft'   component={EditDraft}/>
      <Stack.Screen name='StrangerInfo'   component={StrangerInfo}/>
      <Stack.Screen name='RelationChain'   component={RelationChain}/>
      <Stack.Screen name='LocalTickets'   component={LocalTickets}/>
      <Stack.Screen name='LocalAddTicket'   component={LocalAddTicket}/>
      <Stack.Screen name='LocalModifyTicket'   component={LocalModifyTicket}/>
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
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none' mode='modal'>
            <Stack.Screen name='Main'     component={MainStack}/>
            <Stack.Screen name='Auth'     component={AuthStack}/>
            <Stack.Screen name='PublishActive'   component={PublishActive}/>
          </Stack.Navigator>
        </NavigationContainer>
        <ModalLoading />
        <Publish />
      </PersistGate>
    </Provider>
  )
}