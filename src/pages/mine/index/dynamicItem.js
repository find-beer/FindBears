import React, {Component} from 'react';
import {StyleSheet,View, Text, Image,TouchableOpacity} from 'react-native';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';
const imageUrl = {
    like: require('../../../assets/home/unlike.png'),
    comment: require('../../../assets/mine/comment.png'),
    share: require('../../../assets/mine/share-icon.png'),
};
import {get} from 'lodash'
const defaultImg = require('../../../assets/mine/avatar.jpeg');

export default class DynamicItem extends Component {
    constructor(props) {
        super(props);
    }
    handleGoDetail(id){
			this.props.navigation.navigate('DynamicDetail',{id})
		}
    render() {
        const item = this.props.item;
        const picList = this.props.item.picUrl?this.props.item.picUrl.split(',') : [defaultImg,defaultImg,defaultImg]
        return (
            <View style={styles.dynamicItemWrap} >
                <View style={styles.itemHeader}>
                    <Image
                        source={get(item.userVO,'pic',defaultImg)}
                        style={styles.avatarInner}
                    />
                    <View style={styles.dynamicInfo}>
                        <Text style={styles.name}>
                            {
                                get(item.userVO,'userName','探熊')
                            }
                        </Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoPosition}>
                                {item.cityName || '北京'}
                            </Text>
                            <View style={styles.line} />
                            <Text style={styles.infoTime}>
                                {new Date(item.publishTime).toLocaleString()}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dynamicTextBox}>
										<TouchableOpacity onPress={() => this.handleGoDetail(item.id)}>
											<Text style={styles.dynamicText}>
													{item.content}
											</Text>
										</TouchableOpacity>
                    <View style={styles.imgBox}>
                        {
                            picList.map(item => {
                                return(
                                    <Image
                                        source={item}
                                        style={styles.dynamicImg}
                                        key={item}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.operationBox}>
                    <View style={styles.oerationItem}>
                        <Image
                            source={imageUrl.like}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>点赞{item.likeNum}</Text>
                    </View>
                    <View style={styles.oerationItem}>
                        <Image
                            source={imageUrl.comment}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>已评论{item.commentNum}</Text>
                    </View>
                    <View style={styles.oerationItem}>
                        <Image
                            source={imageUrl.share}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>分享</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
	dynamicItemWrap: {
			backgroundColor: '#fff',
			overflow: 'hidden',
			paddingLeft: scaleSize(40),
			paddingRight: scaleSize(40),
			borderBottomColor:'#F2F2F2',
			borderBottomWidth:scaleSize(1),
			borderStyle:'solid'
	},
	itemHeader: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: scaleSize(45),
			marginBottom: scaleSize(35),
	},
	dynamicInfo: {
			flex: 1,
	},
	avatarInner: {
			width: scaleSize(132),
			height: scaleSize(132),
			marginRight: scaleSize(40),
			borderRadius:scaleSize(66)
	},
	name: {
			fontSize: scaleFont(42),
			color: '#564F5F',
			fontWeight: 'bold',
			marginTop: scaleSize(20),
			marginBottom: scaleSize(20),
	},
	infoBox: {
			display: 'flex',
			flexDirection: 'row',
			fontSize: scaleSize(36),
			color: '#999999',
			alignItems: 'center',
	},
	line: {
			height: scaleSize(33),
			width: scaleSize(2),
			borderRadius: scaleSize(2),
			backgroundColor: '#999999',
			marginRight: scaleSize(20),
			marginLeft: scaleSize(10),
	},
	relationBtn: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			width: scaleSize(222),
			height: scaleSize(92),
			justifyContent: 'center',
	},
	relationText: {
			color: '#fff',
			fontSize: scaleFont(40),
	},
	imgBox:{
			display:'flex',
			flexDirection:'row',
			justifyContent:'space-between',
			paddingLeft:scaleSize(30),
			paddingRight:scaleSize(30)
	},
	dynamicTextBox: {},
	dynamicText: {
			fontSize: scaleSize(48),
			color: '#564F5F',
	},
	dynamicImg: {
			marginTop: scaleSize(32),
			width: '100%',
			height: scaleSize(380),
			width:scaleSize(280),
			borderRadius:scaleSize(15)
	},
	operationBox: {
			display: 'flex',
			flexDirection: 'row',
			marginBottom: scaleSize(50),
			marginTop: scaleSize(30),
	},
	oerationItem: {
			display: 'flex',
			flexDirection: 'row',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
	},
	operationIcon: {
			width: scaleSize(55),
			height: scaleSize(55),
			marginRight: scaleSize(20),
	},
	operationText: {
			fontSize: scaleSize(40),
			color: '#564F5F',
			textAlign: 'center',
	},
	viewDetailBtn:{
			marginTop:scaleSize(40),
			marginBottom:scaleSize(40),
			backgroundColor:'#564f5f',
			textAlign:'center',
			height:scaleSize(120),
			borderRadius:scaleSize(60)
	},
	viewDetailBtnText:{
			color:'#fff',
			fontSize:scaleFont(40)
	}
});
