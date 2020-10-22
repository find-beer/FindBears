/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Image, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header/index'
import {screenW} from "../../constants";
import ImagePicker from "react-native-image-picker";
import {scaleFont, scaleSize} from "../../utils/scaleUtil";

export default class PublishTrend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            clockinTag: '',
            images: [],
            isPunchCard: false,
            isPermit: false,
        };
    }

    choosePicture = () => {
        const {images} = this.state;
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
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ');
            } else {
                const source = {uri: response.uri};
                images.push(source);
                console.log(source);
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    images,
                });
            }
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

    immePublish = () => {

    }

    render() {

        const {images, isPunchCard, clockinTag, isPermit} = this.state;

        return <Fragment style={styles.container}>
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
                                source={img}
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
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 8
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
