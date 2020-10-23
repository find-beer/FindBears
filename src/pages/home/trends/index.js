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

export default class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedDetailVOList: [
                {
                cityName: "北京",
                commentNum: 0,
                content: "钱罗罗公司成立盛典",
                id: 0,
                like: false,
                likeNum: 0,
                location: "北京",
                picUrl: "string",
                publishTime: new Date().getTime(),
                userVO: {
                  order: 0,
                  pic: "string",
                  userId: 0,
                  userName: "string"
                },
                videoUrl: "string"
            },{
                cityName: "北京",
                commentNum: 0,
                content: "钱罗罗公司成立盛典",
                id: 2,
                like: false,
                likeNum: 0,
                location: "北京",
                picUrl: "string",
                publishTime: new Date().getTime(),
                userVO: {
                  order: 0,
                  pic: "string",
                  userId: 0,
                  userName: "string"
                },
                videoUrl: "string"
            }],
        };
    }

    renderItem = (rowData) => {
        return (
            <FeedItem {...this.props} feed={rowData} key={rowData.id}/>
        );
    };

    getData = async () => {
        const response = await GetRequest('feed/feeds', {
            limit: 500,
            feedOffsetId: 0,
            activityOffsetId:0
        });
        console.log('数据', response);
        this.setState({
            feedDetailVOList: response.data.feedDetailVOList,
        }, () => {
            console.log('数据啊', this.state.feedDetailVOList);
        });
    }

    componentDidMount() {
        this.getData()
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


