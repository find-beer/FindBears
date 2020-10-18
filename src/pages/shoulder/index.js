/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {screenW} from "../../constants";

export default class Shoulder extends React.Component {
    render() {
        return <Fragment style={styles.container}>
            <SafeAreaView style={{backgroundColor: 'transparent'}}/>
            <View style={styles.search}>
                <Text style={styles.searchHint}>请输入你想去的地方</Text>
            </View>
            <View style={styles.menuContainer}>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/travel-around.png')}/>
                    <Text style={styles.txtMenu}>周边游</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/movie.png')}/>
                    <Text style={styles.txtMenu}>电影演出</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/Cartagena.png')}/>
                    <Text style={styles.txtMenu}>轰趴桌游</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/outdoor.png')}/>
                    <Text style={styles.txtMenu}>户外活动</Text>
                </View>
            </View>
            <View style={styles.menuContainer}>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/amusement-park.png')}/>
                    <Text style={styles.txtMenu}>游乐园</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/game.png')}/>
                    <Text style={styles.txtMenu}>沉浸式娱乐</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/cultural.png')}/>
                    <Text style={styles.txtMenu}>文化体验</Text>
                </View>
                <View style={styles.item}>
                    <Image style={styles.imgMenu} source={require('../../assets/activities/explore.png')}/>
                    <Text style={styles.txtMenu}>新奇探索</Text>
                </View>
            </View>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,.1)',
        width: screenW - 32,
        marginLeft: 16,
        justifyContent: 'center',
        marginTop: 16
    },
    searchHint: {
        color: '#666',
        marginLeft: 16,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imgMenu: {
        width: 40,
        height: 40
    },
    txtMenu: {
        color: '#999'
    },
    item: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
