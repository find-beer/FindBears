/**
 *  活动item
 */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screenW} from '../../utils/screenUtil';
import {scaleSize} from '../../utils/scaleUtil';

export default class ActivityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {activity, navigation} = this.props;
        return (
            <View style={styles.itemContainer}>
                <View style={styles.cards}>
                    <View style={styles.outs}>
                        <Image resizeMode='contain'
                               style={styles.avatar}
                               source={require('../../assets/mine/avatar.jpeg')}/>
                        <View style={{marginLeft: 8}}>
                            <Text style={styles.publisher}>名字</Text>
                            <View style={styles.right}>
                                <Text style={styles.topTxt}>{activity ? activity.cityName : '城市名称'}</Text>
                                <View style={styles.shu}/>
                                <Text style={styles.topTxt}>{activity ? activity.publishTime : '发布时间'}</Text>
                                <View style={styles.shu}/>
                                <Text style={styles.topTxt}>{activity ? activity.memberCount : '0'}人参与</Text>
                            </View>
                        </View>
                    </View>
                    <Text numberOfLines={1} style={styles.name}>{activity ? activity.activityTitle : '标题暂无'}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.timeLeft}>活动时间:</Text>
                        <Text numberOfLines={1}
                              style={styles.time}>{activity ? new Date(activity.activityTime).getFullYear()
                            + '.' + (new Date(activity.activityTime).getMonth() + 1)
                            + '.' + new Date(activity.activityTime).getDate()
                            : '时间待定'}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.cityLeft}>活动地点:</Text>
                        <Text numberOfLines={1} style={styles.city}>{activity ? activity.cityName : '地点暂无'}</Text>
                    </View>

                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ActivityDetail')}>
                    <View style={styles.goToDetail}>
                        <Text style={styles.text}>查看活动详情 >></Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sep}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {},
    goToDetail: {
        backgroundColor: '#564F5F',
        borderRadius: scaleSize(46),
        width: screenW - 54,
        height: scaleSize(100),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: scaleSize(24)
    },
    text: {
        fontSize: scaleSize(36),
        color: '#FFFFFF',
    },
    outs: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 27,
        paddingRight: 27,
    },
    avatar: {width: 66, height: 66, borderRadius: 33},
    publisher: {fontSize: 18, color: '#564F5F', fontWeight: '400'},
    right: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
    upName: {
        width: 3,
        height: 15,
        backgroundColor: '#8E79FE',
        marginRight: 5,
        borderRadius: 5,
    },
    con: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shu: {
        width: 1,
        height: 12,
        backgroundColor: '#999999',
        marginLeft: 3,
        marginRight: 3,
    },
    cards: {
        elevation: 1,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
        shadowColor: '#cdcdcd',  //  阴影颜色
        shadowOffset: {width: 0, height: 0},  // 阴影偏移
        shadowOpacity: 1,  // 阴影不透明度
        width: screenW - 54,
        marginLeft: 27,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 170,
        marginTop: 13,
        marginBottom: 13,
        justifyContent: 'center',
    },
    topTxt: {
        fontSize: 12,
        color: '#999999',
    },
    cardTop: {
        height: 50,
        width: (screenW - 54) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    down: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    rightCon: {
        width: 3,
        height: 12,
        backgroundColor: 'white',
        marginRight: 5,
    },
    sep: {
        width: screenW,
        height: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 12,
    },
    values: {
        width: 60
    },
    name: {
        marginLeft: 27,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8
    },
    time: {
        marginLeft: 8,
        fontSize: 14,
        marginTop: 8
    },
    timeLeft: {
        marginLeft: 27,
        fontSize: 14,
        marginTop: 8
    },
    cityLeft: {
        marginLeft: 27,
        fontSize: 14,
        marginTop: 8
    },
    city: {
        marginLeft: 8,
        fontSize: 14,
        marginTop: 8
    },
});
