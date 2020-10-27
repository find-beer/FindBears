import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

import BaseCommonDialog from './BaseCommonDialog';
import {screenW} from "../../constants";
import EventBus from "../../utils/EventBus";

export default class SelectItemsDialog extends BaseCommonDialog {

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
        items: [
            {name: '周边游', id: 1},
            {name: '电影演出', id: 3},
            {name: '轰趴桌游', id: 2},
            {name: '户外运动', id: 4},
            {name: '游乐园', id: 5},
            {name: '沉浸式娱乐', id: 6},
            {name: '文化体验', id: 7},
            {name: '新奇探索', id: 8},
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
                            EventBus.post('typeName', {name:item.name,id:item.id})
                        }
                    });
                }}
                key={index}
                style={{width: screenW, height: 49, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                    fontSize: 14,
                    color: '#333'
                }}>{item.name}</Text>
                <View style={{position: 'absolute', bottom: 0, width: screenW, height: 1, backgroundColor: '#E8EEF0'}}/>
            </TouchableOpacity>
        })
    }

    renderCancel() {
        return <TouchableOpacity
            onPress={() => this.dismiss()}
            style={{width: screenW, height: 49, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={this.props.cancelTextStyle}>{this.props.cancelText}</Text>
        </TouchableOpacity>
    }

    renderContent() {
        return <View style={{width: screenW, backgroundColor: '#fff', paddingBottom: 16}}>
            {this.renderItems()}
            {this.props.cancel ? this.renderCancel() : null}
        </View>
    }
}

