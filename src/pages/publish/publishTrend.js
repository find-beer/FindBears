/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Image, Platform, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header/index'
import {screenW} from "../../constants";
import ImagePicker from "react-native-image-picker";
import {scaleFont, scaleSize} from "../../utils/scaleUtil";
import {PostRequest} from "../../utils/request";
import EventBus from "../../utils/EventBus";
import {apiProd} from "../../config";
import AsyncStorage from "@react-native-community/async-storage";

let arr = [];
export default class PublishTrend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            clockinTag: '',
            images: [],
            isPunchCard: false,
            isPermit: true,
            token: null
        };
    }

    componentWillUnmount() {
        arr = [];
        this.setState({
            images: arr
        })
    }

    componentDidMount() {
        AsyncStorage.getItem('session', (error, result) => {
            this.setState({token: result})
        })
    }

    choosePicture = () => {
        const {images, token} = this.state;
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '图片库',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 600,
            maxHeight: 600,
            aspectX: 2,
            aspectY: 1,
            quality: 0.5,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            let formData = new FormData();
            formData.append('imgFile', {
                uri: Platform.OS === 'ios' ? 'data:image/jpeg;base64,' + response.data : response.uri,
                type: 'multipart/form-data',
                name: 'trend' + new Date().getTime() + '.jpg',
            });

            let currentHeader;
            if (Platform.OS === 'ios') {
                currentHeader = {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                    token
                }
            } else {
                currentHeader = {
                    'Accept': 'application/json',
                    token
                }
            }
            fetch(apiProd.host + 'common/uploadImage', {
                method: 'POST',
                headers: currentHeader,
                body: formData,
            })
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    arr.push(res.data.url);
                    this.setState({
                        images: arr
                    })
                }).catch((e) => {
            });

        });
    };

    onValueChange = () => {
        this.setState({
            isPunchCard: !this.state.isPunchCard,
        });
    };

    onPermitChange = () => {
        this.setState({
            isPermit: !this.state.isPermit,
        });
    };

    immePublish = async () => {
        const {content, clockinTag, images, isPunchCard, isPermit} = this.state;
        const {navigation} = this.props;
        const response = await PostRequest('feed/publish', {
            "address": "上帝之城",
            "clockIn": isPermit ? 1 : 0,
            "clockInTag": clockinTag,
            "content": content,
            "displayCity": isPunchCard ? 1 : 0,
            "location": "123.236944,41.267244",
            "picUrl": this.state.images.join(','),
            "videoUrl": ""
        });
        if (response.code === 0) {
            navigation.goBack();
            EventBus.post('REFRESH_TREND', {});
        }
    }

    render() {

        const {images, isPunchCard, clockinTag, isPermit} = this.state;

        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'发布动态'}/>
            <View style={{flex: 1}}>
                <TextInput textAlign='left'
                           underlineColorAndroid='transparent'
                           onChangeText={(text) => {
                               this.setState({
                                   content: text
                               })
                           }}
                           textAlignVertical="top"
                           multiline
                           style={styles.up}
                           placeholder={'编辑文字内容...'}
                           placeholderTextColor='#999'/>
                <View style={styles.pictures}>
                    {images.map((img, index) => (
                        <View key={index}>
                            <Image
                                style={[
                                    styles.picture,
                                    (index + 1) % 3 && styles.picMargin,
                                ]}
                                source={{'uri': img}}
                            />
                        </View>
                    ))}
                    {images.length < 6 && (
                        <TouchableOpacity
                            onPress={this.choosePicture}
                            style={styles.addButton}>
                            <Image
                                style={styles.addIcon}
                                source={require('../../assets/publish/add-image.png')}
                            />
                            <Text style={styles.grayFont}>
                                添加图片/视频
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, marginLeft: 16}}>
                    <Switch
                        value={isPunchCard}
                        onValueChange={this.onValueChange}
                    />
                    <Text style={{marginLeft: 8}}>标记为打卡</Text>
                </View>
                {isPunchCard && (
                    <View style={styles.dakaTag}>
                        <Text style={styles.tagText}>输入打卡标签:</Text>
                        <TextInput
                            value={clockinTag}
                            onChangeText={(text) => {
                                this.setState({
                                    clockinTag: text
                                })
                            }}
                            style={styles.tagInput}
                        />
                    </View>
                )}
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, marginLeft: 16}}>
                    <Switch
                        value={isPermit}
                        onValueChange={this.onPermitChange}
                    />
                    <Text style={{marginLeft: 8}}>是否允许发布到同城</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.immePublish}>
                    <View style={styles.bottom}>
                        <Text style={styles.txt}>发布</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        height: 60,
        width: screenW,
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {color: 'white', fontSize: 16},
    up: {
        height: 180,
        fontSize: 16,
        backgroundColor: 'white',
        marginLeft: 16,
        marginRight: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 8,
        marginTop: 16
    },
    pictures: {
        marginTop: scaleSize(54),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 16,
        marginRight: 16,
    },
    picture: {
        height: scaleSize(379),
        width: scaleSize(289),
        borderRadius: scaleSize(24),
        marginBottom: scaleSize(54),
    },
    picMargin: {
        marginRight: scaleSize((screenW - 289 - 54) / 2),
    },
    addIcon: {
        width: scaleSize(72),
        height: scaleSize(72),
        marginBottom: scaleSize(30),
    },
    addButton: {
        height: scaleSize(379),
        width: scaleSize(289),
        backgroundColor: '#FBFBFB',
        borderRadius: scaleSize(24),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grayFont: {
        color: '#999999',
        fontSize: scaleFont(36),
    },
    dakaTag: {
        width: screenW - 32,
        height: scaleSize(111),
        backgroundColor: 'rgba(135,120,247,0.08)',
        borderRadius: scaleSize(57),
        // opacity: 0.08,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleSize(42),
        marginTop: scaleSize(60),
        marginLeft: 16,
        marginRight: 16
    },
    tagText: {
        color: '#8778F7',
        fontSize: scaleFont(42),
        marginRight: scaleSize(10),
    },
    tagInput: {
        flex: 1,
        color: '#8778F7',
    },
});
