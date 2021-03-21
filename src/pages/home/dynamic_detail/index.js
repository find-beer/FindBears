/**
 *  动态详情
 */

import React, {Fragment} from 'react';
import {StyleSheet, Image, View, Text, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import {InputItem} from '@ant-design/react-native'
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';
import Header from '../../../components/header/index';
import User from './user';
import Photo from './photo';
import Action from './action';
import Comment from './comment';
import {GetRequest, PostRequest} from "../../../utils/request";
import ImageViewer from "react-native-image-viewing";

const defaultImage = require('../../../assets/mine/avatar.jpeg')
import EventBus from '../../../utils/EventBus';


export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: '请发表评论',
            id: this.props.route.params.id,
            detail: {},
            commentList: [],
            currentComment: {},
            comment: ''
        };
    }
    getDetail = () => {
        GetRequest('feed/detail', {id: this.state.id}).then(
					res => {
						this.setState({
							detail: res.data,
						});
					},
        );
        GetRequest('comment/query', {
					infoId: this.state.id,
					infoType: 2,
					limit: 500,
					page: 1
        }).then(
					res => {
						this.setState({
							commentList: res.data
						})
					},
        );
    }

    handleComment(item) {
        this.setState({
            currentComment: item
        })
    }

    componentDidMount() {
        this.getDetail();
    }
    handlePublish(){
        if(!this.state.comment.trim()){
            return;
        }
        PostRequest('comment/publish',{
            content: this.state.comment,
            infoId: this.state.id,
            infoType : 2,
            toUserId: this.state.currentComment.userId||null,
            userId: 12342
        }).then(() => {
            this.getDetail();
            EventBus.post('REFRESH_TREND')
            this.setState({
                comment:'',
                currentComment:{},
                placeholder:'请发表评论'
            })
        })
    }
    render() {
        const {visible,currentIndex,detail} = this.state;
        const picList = detail.picUrl ? detail.picUrl.split(',') : [];
        const images = [];
        picList.map((dataItem, position) => {
            let da = {uri: dataItem}
            images.push(da);
        })
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <SafeAreaView style={styles.container}>
                    <Header {...this.props} title="动态详情" left={null}/>
                    <View style={styles.main}>
                        <User data={detail} {...this.props}/>
                        <Text style={styles.words}>{detail.content}</Text>

                        <View style={styles.imgBox}>
                        {
                            picList.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            currentIndex: index,
                                            visible: true
                                        })
                                    }}>
                                        <Image
                                            source={{uri: item.replace('https','http')}}
                                            style={styles.dynamicImg}
                                            key={index + ''}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                        {/*<Photo data={detail.picUrl}/>*/}
                        {/* <Action data={detail} /> */}
												<ScrollView>
                        {
                            this.state.commentList?.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => this.handleComment(item)}>
                                        <Comment data={item}/>
                                    </TouchableOpacity>
                                )
                            })
                        }
												</ScrollView>

                    </View>
                    <View style={styles.comment_box}>
                        <Image style={styles.comment_avatar} source={defaultImage}/>
                        <View style={styles.comment_text_box}>
                            <InputItem
                                style={styles.comment_text}
                                placeholder={this.state.placeholder}
                                value={this.state.comment}
                                onChange={value => this.setState({comment: value})}/>
                        </View>
                        <TouchableOpacity onPress={() => this.handlePublish()}>
                            <View style={styles.comment_btn}>
                                <Text style={styles.comment_btn_txt}>发表</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ImageViewer
                        images={images}
                        imageIndex={currentIndex}
                        visible={visible}
                        onRequestClose={() => {
                            this.setState({visible: false})
                        }}
                    />
                </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'relative',
        height: '100%'
    },
    main: {
        paddingHorizontal: scaleSize(54)
    },
    words: {
        fontSize: scaleSize(48),
        color: '#564F5F',
        marginBottom: scaleSize(36),
    },
    comment_box: {
        width: '100%',
        position: 'absolute',
        bottom: scaleSize(50),
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: scaleSize(54),
        paddingVertical: scaleSize(27),
        paddingBottom: scaleSize(100),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#f2f2f2',
        borderTopWidth: scaleSize(2)
    },
    comment_avatar: {
        width: scaleSize(88),
        height: scaleSize(88),
        borderRadius: scaleSize(44),
    },
    comment_text_box: {
        flex: 1,
        width: scaleSize(650),
        height: scaleSize(78),
        borderRadius: scaleSize(39),
        borderColor: '#f2f2f2',
        borderStyle: 'solid',
        borderWidth: scaleSize(2),
        backgroundColor: '#f2f2f2',
        display: 'flex',
        paddingHorizontal: scaleSize(30),
        marginHorizontal: scaleSize(20)
    },
    comment_text: {
        flex: 1,
        height: scaleSize(48),
        marginTop: scaleSize(-40)
    },
    comment_btn: {
        width: scaleSize(160),
        height: scaleSize(78),
        borderRadius: scaleSize(39),
        backgroundColor: '#564f5f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    comment_btn_txt: {
        fontSize: scaleFont(40),
        color: '#fff'
    },
    imgBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    dynamicImg: {
        marginTop: scaleSize(16),
        marginBottom: scaleSize(32),
        height: scaleSize(380),
        width: scaleSize(280),
        borderRadius: scaleSize(15),
        marginRight: 12
    },
});
