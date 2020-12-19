import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';

export default props => {
    const {data} = props;
    const picUrl = data
    return (
        <View style={styles.container}>
            {(picUrl? picUrl.split(','):[]).map((item, index) => {
                return (
                    <Image
                        key={index}
                        source={{uri:item}}
                        style={styles.photo}
                    ></Image>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: scaleSize(54),
    },
    photo: {
        width: scaleSize(289),
        height: scaleSize(379),
        marginRight: scaleSize(53),
    },
});
