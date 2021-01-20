/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-19 22:55:47
 * @LastEditTime : 2021-01-21 00:44:39
 * @FilePath     : /src/index.js
 */
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabStack from './tabNavigation'
import createStore from './redux/store'
import Login from './pages/account/login'

const Stack = createStackNavigator()

/**
 * 程序主堆栈
 */
const MainStack = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Tab' component={TabStack} />
  </Stack.Navigator>
)

export default () => {
  const store = createStore()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none' mode='modal'>
          <Stack.Screen name='Main' component={MainStack}/>
          <Stack.Screen name='Login' component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}