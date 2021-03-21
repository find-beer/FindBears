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
import {GetRequest, PostRequest} from "../../utils/request";
import AsyncStorage from "@react-native-community/async-storage";
import { connect, bindActions, bindState } from './../../redux' 
class EditDraft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityTitle: props.route.params.draft.activityTitle,
            memberCount: props.route.params.draft.memberCount,
            activityAddress: props.route.params.draft.activityAddress,
            activityTypeName: props.route.params.draft.activityTypeName,
            activityType: props.route.params.draft.activityType,
            needInfo: props.route.params.draft.needInfo,
            activityTime: props.route.params.draft.activityTime,
            enrollEndTime: props.route.params.draft.enrollEndTime,
            content: props.route.params.draft.content,
            ticketVoList: props.route.params.draft.ticketVoList,
            id: props.route.params.draft.id,
            isStartVisible: false,
            isEndVisible: false,
            userType: props.route.params.userType,
            token: null,
            pics: []
        };
    }

    /**
     * 查询草稿
     */
    queryDraft = async () => {
        const response = await GetRequest('activity/querydraft', {});
        if (response.data) { //
            this.setState({
                activityTitle: response.data.activityTitle,
                memberCount: response.data.memberCount,
                activityAddress: response.data.activityAddress,
                activityTypeName: response.data.activityTypeName,
                activityType: response.data.activityType,
                needInfo: response.data.needInfo,
                activityTime: response.data.activityTime,
                enrollEndTime: response.data.enrollEndTime,
                content: response.data.content,
                ticketVoList: response.data.ticketVoList,
                id: response.data.id,
            })
        } else { //
        }
    }

    componentDidMount() {

        AsyncStorage.getItem('session', (error, result) => {
            this.setState({token: result})
        })

        EventBus.on('typeName', (e) => {
            this.setState({
                activityTypeName: e.name,
                activityType: e.id
            })
        });
        EventBus.on('REFRESH_TICKETS', (e) => {
            this.queryDraft();
        });
        this.queryDraft();
    }

    /**
     * 立即发布/存为草稿
     */
    saveData = async (flag) => {
        const {
            id, activityTitle, activityTime, memberCount, enrollEndTime,
            activityAddress, ticketVoList, activityTypeName, activityType,
            needInfo, content, userType,pics
        } = this.state;
        const {navigation} = this.props;

        let params = null;
        if (userType === 0) {
            params = {
                id,
                activityTitle,
                activityTime,
                memberCount,
                enrollEndTime,
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
                id,
                activityTitle,
                activityTime,
                memberCount,
                enrollEndTime,
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

        try {
            const response = await PostRequest('activity/publish', params, 'POST');
            if (response.code === 0) {
                navigation.goBack();
                EventBus.post('REFRESH_TREND', {});
            }
        } catch (e) {
        }
    }

    showActivityTime = () => {
        this.setState({isStartVisible: true})
    }

    showEndTime = (date) => {
        const {activityTime} = this.state;
        if (activityTime === '' || !activityTime) {
            return
        }
        this.setState({
            isEndVisible: true,
            // enrollEndTime: moment(date).format("YYYY-MM-DD HH:mm"),
        })
    }

    addTicket = () => {
        const {navigation} = this.props;
        navigation.navigate('Tickets', {});
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
        })
    }

    clearInfo = () => {
        this.setState({})
    }

    render() {

        const {
            isStartVisible, activityTime, isEndVisible, activityTitle, activityAddress,
            activityTypeName, needInfo, memberCount, ticketVoList, content, enrollEndTime,
            userType
        } = this.state;

        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'发布活动'} right={'清空'} onRightClick={() => {
                this.clearInfo()
            }}/>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
                <SettingItem title={'活动标题'} subType={'input'} inputHint={'请填写标题'}
                             reflectText={(title) => {
                                 this.setState({
                                     activityTitle: title
                                 })
                             }}
                             sub={activityTitle}
                />
                <SettingItem title={'活动时间'}
                             sub={activityTime ? moment(activityTime).format("YYYY-MM-DD HH:mm") : '不选时间默认为长期活动'}
                             onRightPress={this.showActivityTime}/>
                <SettingItem title={'活动人数'} subType={'number'} inputHint={'请填写人数'}
                             reflectNumText={(num) => {
                                 this.setState({
                                     memberCount: num
                                 })
                             }}
                             sub={memberCount}
                />
                <SettingItem title={'报名截止时间'}
                             sub={enrollEndTime ? enrollEndTime : '默认活动开始前12小时'}
                             onRightPress={this.showEndTime}
                />
                <SettingItem title={'活动位置'} subType={'input'}
                             reflectText={(area) => {
                                 this.setState({
                                     activityAddress: area
                                 })
                             }}
                             sub={activityAddress}
                             inputHint={'请填写位置'}/>
                {
                    userType === 0 ? null :
                        <View>
                            <SettingItem title={'增加票种'} subType={'txt'}
                                         sub={'已设置' + (ticketVoList ? ticketVoList.length : 0) + '个'}
                                         showArrow onRightPress={this.addTicket}/>
                            <SettingItem title={'活动类型'} subType={'txt'} sub={activityTypeName} showArrow
                                         onRightPress={this.selectType}/>
                            <SettingItem title={'是否需要报名人身份证信息'} reflectStatus={(status) => {
                                this.setState({
                                    needInfo: status
                                }, () => {
                                })
                            }}
                                         switchStatus={needInfo === 1}
                                         subType={'switch'} sub={needInfo}/>
                        </View>
                }
                <RichEditor
                    placeholder={'请输入富文本内容'}
                    onChange={this.handleChange}
                    ref={(r) => this.richText = r}
                    initialContentHTML={content}
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
                        <Text style={styles.txt}>存为草稿</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.saveData('activity')}>
                    <View style={styles.publish}>
                        <Text style={styles.txt}>立即发布</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </Fragment>;
    }
}
 export default connect(bindState, bindActions)(EditDraft)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    draft: {
        height: 60,
        width: screenW / 2,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    publish: {
        height: 60,
        width: screenW / 2,
        backgroundColor: '#564F5F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {color: '#564F5F', fontSize: 16},
});
