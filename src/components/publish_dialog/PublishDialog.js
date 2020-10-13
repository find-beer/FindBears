import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseCommonDialog from './BaseCommonDialog';
import {PublishIcon, screenH, screenW} from '../../constants';
import EventBus from "../../utils/EventBus";

class PublishDialog extends BaseCommonDialog {

    // static defaultProps = {
    //     onItemClick: PropTypes.func,
    //     data: PropTypes.array,
    // };

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
        return <TouchableOpacity onPress={()=>{this.dismiss()}} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {
                    EventBus.post('GO_ACTIVITY');
                    this.dismiss(()=>{});
                }}>
                    <Image style={styles.icon} source={PublishIcon.activity}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    EventBus.post('GO_TREND');
                    this.dismiss(()=>{});
                }}>
                    <Image style={styles.icon2} source={PublishIcon.trend}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    }

}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        height: screenH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {width: 50, height: 50, marginRight: 10},
    icon2: {width: 50, height: 50, marginLeft: 10},
});

export default PublishDialog;
