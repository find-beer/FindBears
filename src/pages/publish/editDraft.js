/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

export default class EditDraft extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityTitle: props.navigation.state.params.draft.activityTitle,
            memberCount: props.navigation.state.params.draft.memberCount,
            activityAddress: props.navigation.state.params.draft.activityAddress,
            activityTypeName: props.navigation.state.params.draft.activityTypeName,
            activityType: props.navigation.state.params.draft.activityType,
            needInfo: props.navigation.state.params.draft.needInfo,
            activityTime: props.navigation.state.params.draft.activityTime,
            enrollEndTime: props.navigation.state.params.draft.enrollEndTime,
            content: props.navigation.state.params.draft.content,
            ticketVoList: props.navigation.state.params.draft.ticketVoList,
            id: props.navigation.state.params.draft.id,
            isStartVisible: false,
            isEndVisible: false,
        };
    }

    /**
     * 查询草稿
     */
    queryDraft = async () => {
        const response = await GetRequest('activity/querydraft', {});
        if (response.data) { //
            console.log('存在草稿');
            console.log(response.data);
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
            console.log('不存在草稿');
        }
    }

    componentDidMount() {
        EventBus.on('typeName', (e) => {
            this.setState({
                activityTypeName: e.name,
                activityType: e.id
            })
        });
        EventBus.on('REFRESH_TICKETS', (e) => {
            this.queryDraft();
        });
        console.log('页面传参', this.state.draft);
        this.queryDraft();
    }

    /**
     * 立即发布/存为草稿
     */
    saveData = async (flag) => {
        const {
            id, activityTitle, activityTime, memberCount, enrollEndTime,
            activityAddress, ticketVoList, activityTypeName, activityType,
            needInfo, content
        } = this.state;
        const {navigation} = this.props;
        console.log("flag===>", flag);
        console.log("id===>", id);

        try {
            const response = await PostRequest('activity/publish', {
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
                "userType": 1,
                "activityValid": 1,
                "state": flag === 'activity' ? 2 : 1
            }, 'POST');

            console.log('发布活动结果', response);
            if (response.code === 0) {
                navigation.goBack();
                EventBus.post('REFRESH_TREND', {});
            }
        } catch (e) {
            console.log('报错了', e);
        }
    }

    showActivityTime = () => {
        this.setState({isStartVisible: true})
    }

    showEndTime = (date) => {
        const {activityTime} = this.state;
        if (activityTime === '') {
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
            console.log('活动时间', this.state.activityTime)
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

        ImagePicker.showImagePicker(options, response => {
            console.log('图片 = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let formData = new FormData();
                formData.append('imgFile', {
                    uri: 'data:image/jpeg;base64,' + response.data,
                    type: 'multipart/form-data',
                    name: 'trend' + new Date().getTime() + '.jpg',
                });
                fetch(apiProd.host + 'common/uploadImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8',
                        'token': '1_1604737548947'
                    },
                    body: formData,
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(res => {
                        console.log('---->', res.data.url);
                        this.richText.insertImage(res.data.url);
                        this.richText.blurContentEditor();
                    });
                // this.richText.insertImage('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png');
            }
        });
    }

    handleChange = (html) => {
        this.setState({
            content: html
        })
    }

    render() {

        const {
            isStartVisible, activityTime, isEndVisible, activityTitle, activityAddress,
            activityTypeName, needInfo, memberCount, ticketVoList, content, enrollEndTime
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
                             sub={activityTitle}
                />
                <SettingItem title={'活动时间'}
                             sub={activityTime !== '' ? moment(activityTime).format("YYYY-MM-DD HH:mm") : '不选时间默认为长期活动'}
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
                             sub={enrollEndTime}
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
                <SettingItem title={'增加票种'} subType={'txt'} sub={'已设置' + (ticketVoList ? ticketVoList.length : 0) + '个'}
                             showArrow onRightPress={this.addTicket}/>
                <SettingItem title={'活动类型'} subType={'txt'} sub={activityTypeName} showArrow
                             onRightPress={this.selectType}/>
                <SettingItem title={'是否需要报名人身份证信息'} reflectStatus={(status) => {
                    this.setState({
                        needInfo: status
                    }, () => {
                        console.log('needInfo', status)
                    })
                }}
                             switchStatus={needInfo === 1}
                             subType={'switch'} sub={needInfo} onRightPress={this.selectType}/>

                <RichEditor
                    placeholder={'请输入富文本内容'}
                    onChange={this.handleChange}
                    ref={(r) => this.richText = r}
                    initialContentHTML={content}
                    editorInitializedCallback={() => this.onEditorInitialized()}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    draft: {
        height: 60,
        width: screenW / 2,
        backgroundColor: '#cdcdcd',
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
    txt: {color: 'white', fontSize: 16},
});
