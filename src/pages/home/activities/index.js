/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {GetRequest} from "../../../utils/request";
import ActivityItem from "../../../components/activity_item/activityItem";
import DynamicItem from "../../../components/dynamic_item/dynamicItem";
import EventBus from "../../../utils/EventBus";

export default class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            relationDetailList: [],
        };
    }
    goDetail(route,item){
        console.log(item)
        // this.props.navigation.navigate(route, {
        //     type: item.id
        // })
    }
    renderItem = (rowData) => {
        const {navigation} = this.props;
        const activity = rowData.item.activityDetailVO;
        const feed = rowData.item.feedDetailVO;
        if (activity) {
            return (
                <ActivityItem onBtnClick={() => goDetail(ActivityItem,activity)} {...this.props} activity={activity}/>
            );
        }
        if (feed) {
            return (
                <DynamicItem onBtnClick={() => goDetail(DynamicItem,feed)} {...this.props} feed={feed}/>
            );
        }
    };

    getData = async () => {
        const response = await GetRequest('user/relationfeed', {
            limit: 100,
            feedOffsetId: 0,
            activityOffsetId: 0,
        });
        this.setState({
            relationDetailList: response.data.relationDetailList,
        }, () => {
        });
    }

    componentDidMount() {
        this.getData()
        EventBus.on('REFRESH_ACTIVITY', () => {
            this.getData();
        })
        EventBus.on('REFRESH_TREND', () => {
            this.getData();
        })
    }

    render() {
        const {relationDetailList} = this.state;
        return <View style={styles.container}>
            <FlatList
                data={relationDetailList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item + index}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
