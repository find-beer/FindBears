import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseCommonDialog from './BaseCommonDialog';
import {PublishIcon, screenW} from '../../constants';
import EventBus from "../../utils/EventBus";

class PublishDialog extends BaseCommonDialog {

    constructor(props) {
        super(props);
        this.state = {
            info: null,
        };
    }

    show(callback, state = {}) {
        super.show(callback, state);
    }

    dismiss(callback) {
        super.dismiss(callback);
    }

    getContentPosition() {
        return {justifyContent: 'flex-end', alignItems: 'center'};
    }

    renderContent() {
        return <TouchableOpacity onPress={() => {
            this.dismiss()
        }} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={styles.btnBg}
                    onPress={() => {
                        EventBus.post('GO_ACTIVITY');
                        this.dismiss(() => {
                        });
                    }}>
                    <Image style={styles.icon} source={PublishIcon.activity}/>
                    <Text>发布活动</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnBg}
                    onPress={() => {
                        EventBus.post('GO_TREND');
                        this.dismiss(() => {
                        });
                    }}>
                    <Image style={styles.icon2} source={PublishIcon.trend}/>
                    <Text>发布动态</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    }

}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    icon: {width: 50, height: 50},
    icon2: {width: 50, height: 50},
    btnBg: {alignItems: 'center', justifyContent: 'center', width: 100},
});

export default PublishDialog;
