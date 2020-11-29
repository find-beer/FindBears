/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList,StyleSheet, View} from 'react-native';
import {GetRequest} from "../../../utils/request";
import FeedItem from "./feedItem.js";
import EventBus from "../../../utils/EventBus";

export default class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedDetailVOList: [],
        };
    }

    renderItem = (rowData) => {
        return (
            <FeedItem 
            {...this.props} 
            feed={rowData.item} 
            key={rowData.item.id}
            />
        );
    };

    getData = async () => {
        const response = await GetRequest('feed/feeds', {
            random:0,
            limit: 500,
            offsetId: 0,
            location: '123.18152,41.269402'
        });
        this.setState({
            feedDetailVOList: response.data.feedDetailVOList,
        });
    }

    componentDidMount() {
        this.getData();
        EventBus.on('REFRESH_TREND', () => {
            this.setState({
                feedDetailVOList: []
            }, () => {
                this.getData();
            })
            console.log('------->', '刷新数据...')
        });
    }
    render() {
        const {feedDetailVOList} = this.state;
        return <View style={styles.container}>
            <FlatList
                data={feedDetailVOList}
                keyExtractor={(item, index) => item + index}
                renderItem={this.renderItem}
            />
        </View>;
    }
}


const styles = StyleSheet.create({
    container:{

    }
})


