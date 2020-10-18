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

export default class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            relationDetailList: [],
        };
    }

    renderItem = (rowData: any) => {
        const {item} = rowData;
        const activity = item.activityDetailVO;
        // console.log('item数据', item);
        // console.log('活动数据', activity);
        return (
            <ActivityItem {...this.props} activity={activity}/>
        );
    };

    getData = async () => {
        const response = await GetRequest('user/relationfeed', {
            limit: 10,
            feedOffsetId: 0,
            activityOffsetId: 0,
        });
        console.log('数据', response);
        this.setState({
            relationDetailList: response.data.relationDetailList,
        }, () => {
            console.log('数据啊', this.state.relationDetailList);
        });
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const {relationDetailList} = this.state;
        return <View style={styles.container}>
            <FlatList
                data={relationDetailList}
                keyExtractor={(item, index) => item + index}
                renderItem={this.renderItem}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
