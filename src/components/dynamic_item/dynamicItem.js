import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {get} from 'lodash'
import {scaleFont, scaleSize} from '../../utils/scaleUtil';
import {PostRequest} from "../../utils/request";
import EventBus from "../../utils/EventBus";
import {getDate} from '../../utils/date'

const imageUrl = {
    like: require('../../assets/home/like.png'),
    unlike: require('../../assets/home/unlike.png'),
    comment: require('../../assets/mine/comment.png'),
    share: require('../../assets/mine/share-icon.png'),
};

const defaultImg = require('../../assets/mine/avatar.jpeg');
export default class DynamicItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: {...this.props.feed}
        }
    }

    handleGoDetail() {
        this.props.navigation.navigate('DynamicDetail', {id: this.state.feed.id})
    }

    handleLike() {
        PostRequest('like/operate', {
            infoId: this.state.feed.id,
            infoType: 2,
            state: this.state.feed.like ? 0 : 1,
        }).then(res => {
            if (this.state.feed.like) {
                this.setState({
                    feed: {
                        ...this.state.feed,
                        like: false,
                        likeNum: this.state.feed.likeNum - 1
                    }

                })
            } else {
                this.setState({
                    feed: {
                        ...this.state.feed,
                        like: true,
                        likeNum: this.state.feed.likeNum + 1
                    }
                })
            }
            EventBus.post('REFRESH_TREND',{})
        })
    }
    handlegoStrangerPage(){
        this.props.navigation.navigate('StrangerInfo', {id: this.state.feed.uid})
    }

    render() {
        const feed = this.state.feed;
        const picList = feed.picUrl ? feed.picUrl.split(',') : [];
        return (
            <View style={styles.dynamicItemWrap}>
                <View style={styles.itemHeader}>
                    <TouchableOpacity onPress={() =>this.handlegoStrangerPage()}>
                        <Image
                            source={{uri: get(feed.userVO, 'pic', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1817066819,1530157012&fm=11&gp=0.jpg')}}
                            style={styles.avatarInner}
                        ></Image>
                    </TouchableOpacity>
                    <View style={styles.dynamicInfo}>
                        <Text style={styles.name}>
                            {
                                get(feed.userVO, 'userName', '探熊')
                            }
                        </Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoPosition}>
                                {feed.cityName || '北京'}
                            </Text>
                            <View style={styles.line}/>
                            <Text style={styles.infoTime}>
                                {getDate(feed.publishTime)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dynamicTextBox}>
                    <TouchableOpacity onPress={() => this.handleGoDetail()}>
                        <Text style={styles.dynamicText}>
                            {feed.content}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.imgBox}>
                        {
                            picList.map((item, index) => {
                                return (
                                    <Image
                                        source={{uri: item}}
                                        style={styles.dynamicImg}
                                        key={index + ''}
                                    ></Image>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.operationBox}>
                    <TouchableOpacity
                        style={styles.operationItem1}
                        onPress={() => this.handleLike()}>
                        <Image
                            source={feed.like ? imageUrl.like : imageUrl.unlike}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>点赞{feed.likeNum}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.operationItem2}
                        onPress={() => this.handleGoDetail()}
                    >
                        <Image
                            source={imageUrl.comment}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>已评论{feed.commentNum}</Text>
                    </TouchableOpacity>
                    <View style={styles.operationItem3}>
                        <Image
                            source={imageUrl.share}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>分享</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dynamicItemWrap: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingHorizontal: 30,
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: scaleSize(1),
        borderStyle: 'solid'
    },
    itemHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleSize(45),
        marginBottom: scaleSize(10),
    },
    dynamicInfo: {
        flex: 1,
    },
    avatarInner: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: scaleSize(40),
    },
    name: {
        color: '#564F5F',
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
        fontSize: 18,
        fontWeight: '400'
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: scaleSize(36),
        color: '#999999',
        alignItems: 'center',
    },
    line: {
        height: scaleSize(33),
        width: scaleSize(2),
        borderRadius: scaleSize(2),
        backgroundColor: '#999999',
        marginRight: scaleSize(20),
        marginLeft: scaleSize(10),
    },
    relationBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(222),
        height: scaleSize(92),
        justifyContent: 'center',
    },
    relationText: {
        color: '#fff',
        fontSize: scaleFont(40),
    },
    imgBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    dynamicText: {
        fontSize: scaleSize(48),
        color: '#564F5F',
    },
    dynamicImg: {
        marginTop: scaleSize(32),
        height: scaleSize(380),
        width: scaleSize(280),
        borderRadius: scaleSize(15)
    },
    operationBox: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: scaleSize(50),
        marginTop: scaleSize(30),
    },
    operationItem1: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    operationItem2: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operationItem3: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    operationIcon: {
        width: scaleSize(55),
        height: scaleSize(55),
        marginRight: scaleSize(20),
    },
    operationText: {
        fontSize: scaleSize(40),
        color: '#564F5F',
        textAlign: 'center',
    },
    viewDetailBtn: {
        marginTop: scaleSize(40),
        marginBottom: scaleSize(40),
        backgroundColor: '#564f5f',
        textAlign: 'center',
        lineHeight: scaleSize(120),
        height: scaleSize(120),
        borderRadius: scaleSize(60)
    },
    viewDetailBtnText: {
        color: '#fff',
        fontSize: scaleFont(40)
    },
    infoPosition: {
        fontSize: 12,
        color: '#999999',
    },
    infoTime: {
        fontSize: 12,
        color: '#999999',
    }
});
