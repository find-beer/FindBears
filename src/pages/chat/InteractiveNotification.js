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
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SettingItem from "../../components/setting_item";
import moment from "moment";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class InteractiveNotification extends React.Component {
    render() {
        return <Fragment>
            <SafeAreaView style={{backgroundColor: 'white'}}/>
            <Header {...this.props} title={'互动列表'}/>
        </Fragment>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
});
