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
import EventBus from '../../../utils/EventBus';

export default class Action extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info:{...this.props.data},
        };
        
    }
    componentWillReceiveProps(nextProps){        
        this.setState({
            info:{
                ...nextProps.data
            } 
        })
    }
    giveLike() {
        PostRequest('like/operate', {
            infoId: this.state.info.id,
            infoType: 2,
            state: this.state.info.like?0:1,
        }).then(() => {
            if(this.state.info.like){
                this.setState({
                    info:{
                        ...this.state.info,
                        like:false,
                        likeNum:this.state.info.likeNum - 1
                    } 
                },()=>{
                    EventBus.post('REFRESH_TREND',{})
                })
            }else{
                this.setState({
                    info:{
                        ...this.state.info,
                        like:true,
                        likeNum:this.state.info.likeNum + 1
                    } 
                },()=>{
                    EventBus.post('REFRESH_TREND',{})
                })
            }
        });
    }
    comment(){}
    share() {}
    render() {
        const {like, likeNum, commentNum} = this.state.info;
        const list = [
            {
                icon: like ? images.likeImage : images.unlikeImage,
                text: `点赞${likeNum}`,
                hander: 'giveLike',
            },
            {
                icon: images.commentImage,
                text: `评论${commentNum}`,
                hander: 'comment',
            },
            {
                icon: images.shareImage,
                text: `分享`,
                hander: 'share',
            },
        ];

        return (
            <View style={styles.container}>
                {list.map(item => {
                    return (
                        <TouchableOpacity
                            key={item.text}
                            onPress={() => {
                                this[item.hander]();
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
    commentImage: require('../../../assets/mine/comment.png'),
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
