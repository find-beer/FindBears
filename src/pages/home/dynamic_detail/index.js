/**
 *  动态详情
 */

import React from 'react';
import {StyleSheet, View, Text,SafeAreaView} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';
import Header from '../../../components/header/index';
import User from './user';
import Photo from './photo';
import Action from './action';
import Comment from './comment';
import {GetRequest} from "../../../utils/request";
import _ from 'lodash';
// import eventBus from '@utils/eventBus';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.navigation.state.params.id,
            detail: {
                cityName: '',
                clockIn: 0,
                clockInTag: '',
                commentNum: 0,
                content: '',
                id: 0,
                likeNum: 0,
                like: false,
                location: '',
                picUrl: '',
                publishTime: 0,
                userVO: {
                    order: 0,
                    pic: '',
                    userId: 0,
                    userName: '',
                },
                videoUrl: '',
            },
        };
    }

    getDetail() {
        GetRequest('/feed/detail', {id: this.state.id}).then(
            res => {
                this.setState({
                    detail: _.merge({}, this.state.detail, res),
                });
            },
        );
    }

    componentDidMount() {
        // console.log(this.props.navigation.state.params)
        this.getDetail();
        // eventBus.on('dynamicDetail.getDetail', () => {
        //     this.getDetail();
        // })
    }

    render() {
        const {detail} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Header title="动态详情" left={null} />
                <View style={styles.main}>
                    <User data={detail} />
                    <Text style={styles.words}>{detail.content}</Text>
                    <Photo data={[images.photo, images.photo, images.photo]} />
                    <Action data={detail} />
                    <Comment />
                    <Comment />
                    <Comment />
                </View>
            </SafeAreaView>
        );
    }
}

const images = {
    photo: require('../../../assets/relationChain/bg-intro.png'),
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        height:'100%'
    },
    main:{
        paddingHorizontal:scaleSize(54)
    },
    words: {
        fontSize: scaleSize(48),
        color: '#564F5F',
        marginBottom: scaleSize(36),
    },
});
