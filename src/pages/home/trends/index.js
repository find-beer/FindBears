/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {FlatList,StyleSheet, View,Text} from 'react-native';
import {GetRequest} from "../../../utils/request";
import DynamicItem from "../../../components/dynamic_item/dynamicItem";

export default class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            relationDetailList: [],
        };
    }

    renderItem = (rowData) => {
        const {item} = rowData;
        const dynamic = item.feedDetailVO;
        return (
            <DynamicItem {...this.props} dynamic={dynamic}/>
        );
    };

    getData = async () => {
        const response = await GetRequest('user/relationfeed', {
            limit: 500,
            feedOffsetId: 0,
            activityOffsetId:0
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
