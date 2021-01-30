/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:54:56
 * @LastEditTime : 2021-01-23 20:17:39
 * @FilePath     : /index.js
 */
/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
