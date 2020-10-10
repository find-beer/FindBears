import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import posed from 'react-native-pose'; // react-native 动画库

const Scaler = posed.View({ // 定义点击缩放
    active: {scale: 1},
    inactive: {scale: 0.8},
});

const TabBar = props => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation,
    } = props;

    const {routes, index: activeRouteIndex} = navigation.state;
    return (
        <Scaler style={Styles.container}>
            {routes.map((route, routeIndex) => {
                const isRouteActive = routeIndex === activeRouteIndex;
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                console.log(isRouteActive);
                console.log(tintColor);
                return (
                    <TouchableNativeFeedback
                        key={routeIndex}
                        style={Styles.tabButton}
                        onPress={() => {
                            onTabPress({route});
                        }}
                        onLongPress={() => {
                            onTabLongPress({route});
                        }}
                        accessibilityLabel={getAccessibilityLabel({route})}
                    >
                        {route.key === 'Publish' ? ( // 对特殊图标进行特殊处理
                            <Scaler
                                style={Styles.scalerOnline}
                                pose={isRouteActive ? 'active' : 'inactive'}
                            >
                                {renderIcon({route, focused: isRouteActive, tintColor})}
                                <View style={{height: 28}}/>
                            </Scaler>
                        ) : ( // 普通图标普通处理
                            <Scaler
                                style={Styles.scaler}
                                pose={isRouteActive ? 'active' : 'inactive'}
                            >
                                {renderIcon({route, focused: isRouteActive, tintColor})}
                                <Text
                                    style={isRouteActive ? Styles.iconText : Styles.iconTextGray}>{getLabelText({route})}</Text>
                            </Scaler>
                        )}
                    </TouchableNativeFeedback>
                );
            })}
        </Scaler>
    );
};

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#EEEEEE',
        backgroundColor: 'white',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spotLight: {
        // width: scw,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spotLightInner: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    scaler: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scalerOnline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconText: {
        fontSize: 12,
        lineHeight: 20,
    },
    iconTextGray: {
        fontSize: 12,
        lineHeight: 20,
        color: '#cdcdcd',
    },
});

export default TabBar;
