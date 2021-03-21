/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from "../../components/header";
import {screenW} from "../../constants";
import SettingItem from "../../components/setting_item";
import EventBus from "../../utils/EventBus";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from "react-native-image-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {apiProd} from "../../config";
import {PostRequest} from "../../utils/request";
import AsyncStorage from "@react-native-community/async-storage";

export default class PublishActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityTitle: '',
            memberCount: 0,
            activityAddress: '',
            activityTypeName: '周边游',
            activityType: 1,
            needInfo: 0,
            activityTime: '',
            enrollEndTime: '',
            content: '',
            ticketVoList: [],
            isStartVisible: false,
            isEndVisible: false,
            userType: props.route.params.userType,
            token: null,
            pics: []
        };
    }

    componentDidMount() {
        // this.getUserInfo();
        AsyncStorage.getItem('session', (error, result) => {
            this.setState({token: result})
        })
        EventBus.on('typeName', (e) => {
            this.setState({
                activityTypeName: e.name,
                activityType: e.id
            })
        })
    }

    /**
     * 立即发布/存为草稿
     */
    saveData = async (flag) => {
        const {navigation} = this.props;
        const {
            activityTitle, memberCount, activityTime, enrollEndTime, activityType,pics,
            activityTypeName, content, activityAddress, ticketVoList, needInfo, userType
        } = this.state;

        let params = null;
        if (userType === 0) {
            params = {
                activityTitle,
                "activityTime": activityTime !== '' ? moment(activityTime).format("YYYY-MM-DD HH:mm") : '',
                memberCount,
                "enrollEndTime": enrollEndTime !== '' ? moment(enrollEndTime).format("YYYY-MM-DD HH:mm") : '',
                activityAddress,
                "location": '123.236944,41.267244',
                // ticketVoList,
                // activityTypeName,
                // activityType,
                // needInfo,
                content,
                userType,
                "activityValid": 1,
                "state": flag === 'activity' ? 2 : 1,
                picUrl:pics.join(',')
            }
        } else {
            params = {
                activityTitle,
                "activityTime": activityTime !== '' ? moment(activityTime).format("YYYY-MM-DD HH:mm") : '',
                memberCount,
                "enrollEndTime": enrollEndTime !== '' ? moment(enrollEndTime).format("YYYY-MM-DD HH:mm") : '',
                activityAddress,
                "location": '123.236944,41.267244',
                ticketVoList,
                activityTypeName,
                activityType,
                needInfo,
                content,
                userType,
                "activityValid": 1,
                "state": flag === 'activity' ? 2 : 1,
                picUrl:pics.join(',')
            }
        }

        const response = await PostRequest('activity/publish', params, 'POST');

        if (response.code === 0) {
            navigation.goBack();
            EventBus.post('REFRESH_TREND', {});
        }

    }

    showActivityTime = () => {
        this.setState({isStartVisible: true})
    }

    showEndTime = () => {
        const {activityTime} = this.state;
        if (activityTime === '') {
            return
        }
        this.setState({isEndVisible: true})
    }

    handleConfirm = (date) => {
        this.setState({activityTime: moment(date).format("YYYY-MM-DD HH:mm")}, () => {
        })
        this.hideDatePicker();
    };

    handleEndConfirm = (date) => {
        this.setState({
            enrollEndTime: moment(date).format("YYYY-MM-DD HH:mm"),
        })
        this.hideEndDatePicker();
    };


    addTicket = () => {
        const {navigation} = this.props;
        const {ticketVoList} = this.state;
        navigation.navigate('LocalTickets', {
            ticketVoList,
            onSubmit: (data) => {
                this.setState({
                    ticketVoList: data
                })
            }
        })
    }

    selectType = () => {
        global.selectItemsDialog.show()
    }

    hideDatePicker = () => {
        this.setState({isStartVisible: false})
    };

    hideEndDatePicker = () => {
        this.setState({isEndVisible: false})
    };

    onEditorInitialized = () => {

    }

    onPressAddImage = () => {
        const {token} = this.state;
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
                    this.setState({
                        pics: this.state.pics.concat(res.data.url)
                    })
                    this.richText.insertImage(res.data.url);
                    this.richText.blurContentEditor();
                }).catch((e) => {
            });

        });
    }

    handleChange = (html) => {
        this.setState({
            content: html
        }, () => {
        })
    }

    render() {

        const {
            type, isStartVisible, activityTime, isEndVisible, enrollEndTime,
            ticketVoList, needInfo, activityTypeName, userType,
        } = this.state;

        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'发布活动'}/>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
                <SettingItem title={'活动标题'} subType={'input'} inputHint={'请填写标题'}
                             reflectText={(title) => {
                                 this.setState({
                                     activityTitle: title
                                 })
                             }}
                />
                <SettingItem title={'活动时间'}
                             sub={activityTime !== '' ? moment(activityTime).format("YYYY-MM-DD HH:mm") : (userType === 0 ? '选择活动时间' : '不选时间默认为长期活动')}
                             onRightPress={this.showActivityTime}/>
                <SettingItem title={'活动人数'} subType={'number'} inputHint={'请填写人数'}
                             reflectNumText={(num) => {
                                 this.setState({
                                     memberCount: num
                                 })
                             }}
                />
                <SettingItem title={'报名截止时间'}
                             sub={enrollEndTime !== '' ? moment(enrollEndTime).format("YYYY-MM-DD HH:mm") : (userType === 0 ? '选择截止时间' : '(默认活动开始前12小时)')}
                             onRightPress={this.showEndTime}
                />
                <SettingItem title={'活动位置'} subType={'input'}
                             reflectText={(area) => {
                                 this.setState({
                                     activityAddress: area
                                 })
                             }}
                             inputHint={'请填写位置'}/>
                {
                    userType === 0 ? null :
                        <View>
                            <SettingItem title={'增加票种'} subType={'txt'} sub={'已设置' + ticketVoList.length + '个'}
                                         showArrow
                                         onRightPress={this.addTicket}/>
                            <SettingItem title={'活动类型'} subType={'txt'} sub={activityTypeName} showArrow
                                         onRightPress={this.selectType}/>
                            <SettingItem title={'是否需要报名人身份证信息'} reflectStatus={(status) => {
                                this.setState({
                                    needInfo: status
                                }, () => {
                                })
                            }} subType={'switch'}
                                         switchStatus={needInfo === 1}
                                         sub={type}/>
                        </View>
                }

                <RichEditor
                    placeholder={'请输入富文本内容'}
                    onChange={this.handleChange}
                    ref={(r) => this.richText = r}
                    initialContentHTML={''}
                    editorInitializedCallback={() => this.onEditorInitialized()}
                />

            </KeyboardAwareScrollView>

            <DateTimePickerModal
                headerTextIOS={'请选择'}
                confirmTextIOS={'确定'}
                cancelTextIOS={'取消'}
                isVisible={isStartVisible}
                mode={'datetime'}
                locale={'zh'}
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
            />

            <DateTimePickerModal
                headerTextIOS={'请选择'}
                confirmTextIOS={'确定'}
                cancelTextIOS={'取消'}
                isVisible={isEndVisible}
                mode={'datetime'}
                locale={'zh'}
                onConfirm={this.handleEndConfirm}
                onCancel={this.hideEndDatePicker}
            />
            <View>
                <RichToolbar
                    onPressAddImage={this.onPressAddImage}
                    style={{backgroundColor: '(0,0,0,.8)', alignItems: "flex-start"}}
                    getEditor={() => this.richText}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertImage,
                        // actions.insertLink,
                    ]}
                    iconMap={{}}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.saveData('draft')}>
                        <View style={styles.draft}>
                            <Text style={styles.draft_txt}>存为草稿</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.saveData('activity')}>
                        <View style={styles.publish}>
                            <Text style={styles.publish_txt}>立即发布</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    draft: {
        height: 60,
        width: screenW / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    publish: {
        
        height: 60,
        width: screenW / 2,
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    draft_txt:{
        fontSize: 16,
        color: '#564F5F', 
        fontWeight: '500'
    },
    publish_txt:{
        fontSize: 16,
        color: "#FFFFFF", 
        fontWeight: '500'
    },
});
