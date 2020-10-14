import React from 'react';
import {Image,TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './pages/home';
import TabBar from './components/tabbar';
import {TabIcon} from './constants';
import Mine from './pages/mine/index';
import Chat from './pages/chat';
import Shoulder from './pages/shoulder';

// 页面
export const TabContainer = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => {
                return {
                    tabBarIcon: ({tintColor}) => {
                        let soureImge;
                        if (tintColor === '#2961FD') {
                            soureImge = TabIcon.homeActive;
                        } else {
                            soureImge = TabIcon.home;
                        }
                        return <Image style={{width: 26, height: 26}} source={soureImge}/>;
                    },
                    tabBarLabel: '首页',
                    tabBarOptions: {
                        allowFontScaling: false,
                        activeTintColor: '#2961FD',  // 选中项的颜色
                        inactiveTintColor: '#808080', // 未选中项的颜色

                    },
                };
            },

        },
        Shoulder: {
            screen: Shoulder,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    let soureImge;
                    if (tintColor === '#2961FD') {
                        soureImge = TabIcon.shoulderActive;
                    } else {
                        soureImge = TabIcon.shoulder;
                    }
                    return <Image style={{width: 26, height: 26}} source={soureImge}/>;
                },
                tabBarLabel: '擦肩',
                tabBarOptions: {
                    allowFontScaling: false,
                    activeTintColor: '#2961FD',  // 选中项的颜色
                    inactiveTintColor: '#808080', // 未选中项的颜色
                },
            },

        },
        Publish: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <TouchableOpacity onPress={()=>{
                        global.publishDialog.show(()=>{},{
                        })
                    }}>
                        <Image style={{width: 70, height: 70}} source={TabIcon.publish}/>
                    </TouchableOpacity>;
                },
                tabBarOnPress: ({navigation, defaultHandler}) => {
                },
            },
        },
        Chat: {
            screen: Chat,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    let soureImge;
                    if (tintColor === '#2961FD') {
                        soureImge = TabIcon.chatActive;
                    } else {
                        soureImge = TabIcon.chat;
                    }
                    return <Image style={{width: 26, height: 26}} source={soureImge}/>;
                },
                tabBarLabel: '消息',
                tabBarOptions: {
                    allowFontScaling: false,
                    activeTintColor: '#2961FD',  // 选中项的颜色
                    inactiveTintColor: '#808080', // 未选中项的颜色
                },
            },
        },
        Mine: {
            screen: Mine,
            navigationOptions: () => {
                return {
                    tabBarIcon: ({tintColor}) => {
                        let soureImge;
                        if (tintColor === '#2961FD') {
                            soureImge = TabIcon.mineActive;
                        } else {
                            soureImge = TabIcon.mine;
                        }
                        return <Image style={{width: 26, height: 26}} source={soureImge}/>;
                    },
                    tabBarLabel: '我的',
                    tabBarOptions: {
                        allowFontScaling: false,
                        activeTintColor: '#2961FD',  // 选中项的颜色
                        inactiveTintColor: '#808080', // 未选中项的颜色
                    },
                };
            },
        },
    },
    {
        initialRouteName: 'Home', // 初始化页面
        tabBarComponent: TabBar,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#2961FD',
            inactiveTintColor: '#808080',
            style: {backgroundColor: '#F9F9F9', borderTopWidth: 0.5, borderTopColor: '#cdcdcd'},
            showIcon: true,
            tabBarVisible: true,
            showLabel:true
        },

    },
);

// export default class MainContainer extends React.Component {
//     render() {
//         const TabScreen = TabContainer;
//         return <TabScreen/>;
//     }
// }
