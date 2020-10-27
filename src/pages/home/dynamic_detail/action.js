import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import {scaleSize} from '../../../utils/scaleUtil';
import {PostRequest} from "../../../utils/request";
// import eventBus from '../../../utils/EventBus';

export default class Action extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            likeNum: 0,
            commentNum: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            likeNum: nextProps.data.likeNum,
            commentNum: nextProps.data.commentNum,
        });
    }

    giveLike() {
        PostRequest('/like/operate', {
            infoId: 1,
            infoType: 2,
            state: 0,
        }).then(res => {
            // eventBus.emit('dynamicDetail.getDetail');
        });
    }

    join() {}

    share() {}

    render() {
        const {like, likeNum, commentNum} = this.state;
        const list = [
            {
                icon: like ? images.likeImage : images.unlikeImage,
                text: `点赞${likeNum}`,
                hander: this.giveLike,
            },
            {
                icon: images.joinImage,
                text: `评论${commentNum}`,
                hander: this.join,
            },
            {
                icon: images.shareImage,
                text: `分享`,
                hander: this.share,
            },
        ];

        return (
            <View style={styles.container}>
                {list.map(item => {
                    return (
                        <TouchableOpacity
                            key={item.text}
                            onPress={() => {
                                item.hander();
                            }}>
                            <View style={styles.action}>
                                <ImageBackground
                                    source={item.icon}
                                    style={styles.icon}
                                />
                                <Text>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

const images = {
    unlikeImage: require('../../../assets/home/unlike.png'),
    likeImage: require('../../../assets/home/like.png'),
    joinImage: require('../../../assets/home/join.png'),
    shareImage: require('../../../assets/home/share.png'),
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: scaleSize(40),
        marginBottom: scaleSize(80),
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: scaleSize(50),
        height: scaleSize(50),
        marginRight: scaleSize(19),
    },
});
