/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from "../../components/scrollable_tab_bar/CustomTabBar";
import Activities from "./activities";
import Trends from "./trends";

export default class Home extends React.Component {
    render() {
        return <SafeAreaView style={styles.container}>
            <ScrollableTabView
                renderTabBar={() => <CustomTabBar/>}
            >
                <View style={styles.container} tabLabel="关系网">
                    <Activities {...this.props}/>
                </View>
                <View style={styles.container} tabLabel="XX活动">
                    <Trends {...this.props}/>
                </View>
            </ScrollableTabView>
        </SafeAreaView>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
