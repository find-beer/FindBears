/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:57:04
 * @LastEditTime : 2021-01-17 22:48:25
 * @FilePath     : /src/pages/home/trends/index.js
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList,StyleSheet, View,RefreshControl} from 'react-native';
import FeedItem from "./feedItem.js";
import Toast from 'react-native-root-toast'
import { bindActions, bindState, connect } from './../../../redux';
import NoData from './../../../components/noData'
class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedDetailVOList: [],
            isRefreshing:false,
            loginUid:''
        };
    }

    componentDidMount() {
        console.log('this.props. -------> ', this.props)
        this.getData();
    }

    renderItem = (rowData) => {
        return (
            <FeedItem 
            {...this.props} 
            loginUid={this.state.loginUid}
            feed={rowData.item} 
            key={rowData.item.id}
            />
        );
    };

    getData = async () => {
        try {
            const {success, data} = await this.props.get('/feed/feeds', {
                random:0,
                limit: 500,
                offsetId: 0,
                location: '123.18152,41.269402'
            })
            if (success) {
                return this.setState({
                    feedDetailVOList: data.feedDetailVOList,
                });
            }
            Toast.show('查询失败，请重试',{ position: Toast.positions.CENTER })
        } catch(e) {
            Toast.show('查询失败，请重试',{ position: Toast.positions.CENTER })
        }
    }

    render() {
        const {feedDetailVOList,isRefreshing} = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={feedDetailVOList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={this.renderItem}
                    ListEmptyComponent={NoData}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this.getData}
                        />
                    }
                />
            </View>
        );
    }
}
export default connect(bindState, bindActions)(Trends)

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    list: {
        flex: 1
    }
})


