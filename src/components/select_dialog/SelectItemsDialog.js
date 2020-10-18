
import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList
} from 'react-native';

import BaseCommonDialog from './BaseCommonDialog';
import {isIphoneX} from "../../utils/screenUtil";
import {screenW} from "../../constants";
import EventBus from "../../utils/EventBus";

class SelectItemsDialog extends BaseCommonDialog {

    static defaultProps = {
        itemKey: 'key',
        itemStyle: {
            fontSize: 14,
            fontWeight: '400',
            color: '#333333'
        },
        cancel: true,
        cancelText: '取消',
        cancelTextStyle: {
            fontSize: 14,
            fontWeight: '400',
            color: '#999999'
        },
        onPress: null,
        items:[
            '周边游',
            '电影演出',
            '轰趴桌游',
            '户外运动',
            '游乐园',
            '沉浸式娱乐',
            '文化体验',
            '新奇探索',
        ]
    }

    constructor(props) {
        super(props);
    }

    renderItems() {
        return this.props.items.map((item, index) => {
            return <TouchableOpacity
                onPress={() => {
                    this.dismiss(() => {
                        if (this.props.onPress) {
                            EventBus.post('typeName',{item})
                        }
                    });
                }}
                key={index}
                style={{ width: screenW, height: 49, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize:14,color:'#333'}}>{typeof item == 'string' ? item : item[this.props.itemKey]}</Text>
                <View style={{ position: 'absolute', bottom: 0, width: screenW, height: 1, backgroundColor: '#E8EEF0' }} />
            </TouchableOpacity>
        })
    }

    renderCancel() {
        return <TouchableOpacity
            onPress={() => this.dismiss()}
            style={{ width: screenW, height: 49, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={this.props.cancelTextStyle}>{this.props.cancelText}</Text>
        </TouchableOpacity>
    }

    renderContent() {
        return <View style={{ width: screenW, backgroundColor: '#fff',paddingBottom: 16}}>
            {this.renderItems()}
            {this.props.cancel ? this.renderCancel() : null}
        </View>
    }
}

export default SelectItemsDialog;
