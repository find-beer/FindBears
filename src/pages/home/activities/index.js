/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View,Modal} from 'react-native';
import {GetRequest} from "../../../utils/request";
import ActivityItem from "../../../components/activity_item/activityItem";
import DynamicItem from "../../../components/dynamic_item/dynamicItem";
import EventBus from "../../../utils/EventBus";


export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relationDetailList: [],
            isRefreshing: false
        };
    }

    renderItem = (rowData) => {
        const activity = rowData.item.activityDetailVO;
        const feed = rowData.item.feedDetailVO;
        const {navigation} = this.props;
        if (activity) {
            return (
                <ActivityItem
                    onBtnClick={() => navigation.navigate('ActivityDetail', {id: activity.id,refresh:() => this.getData()})} {...this.props}
                    activity={activity}/>
            );
        }
        if (feed) {
            return (
                <DynamicItem  {...this.props} feed={feed}/>
            );
        }
    };

    getData = () => {
        this.setState({isRefreshing: true});
        GetRequest('user/relationfeed', {
            limit: 500,
            feedOffsetId: 0,
            activityOffsetId: 0
        }).then((res, err) => {
            this.setState({isRefreshing: false});
            console.log('===>', res)
            this.setState({
                relationDetailList: res.data.relationDetailList
            })
        }).catch((e) => {
            console.log('报错', e)
            this.setState({isRefreshing: false});
        });

    }

    componentDidMount() {
        this.getData();
        EventBus.on('REFRESH_TREND', () => {
            this.setState({
                relationDetailList: []
            }, () => {
                this.getData();
            })
            console.log('------->', '刷新数据...')
        });
    }

    render() {
        const {relationDetailList, isRefreshing} = this.state;
        return <View style={styles.container}>
            <FlatList
                data={relationDetailList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item + index}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={this.getData}
                    />
                }
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
