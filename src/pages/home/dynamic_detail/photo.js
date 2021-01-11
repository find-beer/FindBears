import React from 'react';
import {StyleSheet, View, Image,TouchableOpacity} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';

export default class Photo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            currentIndex: 0
        }
    }
    render(){
        const {data} = props;
        const picUrl = data || [];
        const images = [];
        picUrl.map((dataItem, position) => {
            let da = {uri: dataItem.replace('https','http')}
            images.push(da);
        })
        return (
            <View style={styles.container}>
                {(picUrl? picUrl.split(','):[]).map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                currentIndex: index,
                                visible: true
                            })
                        }}>
                            <Image
                                key={index}
                                source={{uri:item.replace('https','http')}}
                                style={styles.photo}
                            ></Image>
                        </TouchableOpacity>
                    );
                })}
                <ImageViewer
                    images={images}
                    imageIndex={currentIndex}
                    visible={visible}
                    onRequestClose={() => {
                        this.setState({visible: false})
                    }}
                />
            </View>
        );
    }
};


