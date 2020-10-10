import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseCommonDialog from './BaseCommonDialog';
import PropTypes from 'prop-types';
import {screenH, screenW} from '../../constants';

class PublishDialog extends BaseCommonDialog {

    static defaultProps = {
        onItemClick: PropTypes.func,
        data: PropTypes.array,
    };

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
        return <TouchableOpacity onPress={()=>{
            global.publishDialog.dismiss()
        }}>
            <View style={styles.container}/>
        </TouchableOpacity>;
    }

}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        height: screenH,
        backgroundColor: 'yellow',
    },
});

export default PublishDialog;
