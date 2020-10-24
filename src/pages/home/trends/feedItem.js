import React, {Component, Children} from 'react';
import {StyleSheet,View, Text, Image,TouchableOpacity} from 'react-native';
const imageUrl = {
    like: require('../../../assets/home/unlike.png'),
    comment: require('../../../assets/mine/comment.png'),
    share: require('../../../assets/mine/share-icon.png'),
};
import {get} from 'lodash'
import {scaleSize,scaleFont} from '../../../utils/scaleUtil';

const defaultImg = require('../../../assets/mine/avatar.jpeg');
export default class DynamicItem extends Component {
    constructor(props) {
				super(props);
    }
    handleGoDetail(id){
			console.log(id)
			this.props.navigation.navigate('DynamicDetail',{id})
		}
		getDate(date){
			if(new Date(date).toDateString() === new Date().toDateString()){
				return `今天 ${new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g,'-').split(' ')[1].substr(6)}`
			}else{
				return `${new Date().toLocaleString('chinese', { hour12: false }).replace(/\//g,'-').substr(5,11)}`
			}
		}
    render() {
			const feed = this.props.feed;
			const picList = feed.picUrl? feed.picUrl.split(',')  : [defaultImg,defaultImg,defaultImg]
			return (
					<View style={styles.dynamicItemWrap} >
							<View style={styles.itemHeader}>
									<Image
											source={get(feed.userVO,'pic',defaultImg)}
											style={styles.avatarInner}
									/>
									<View style={styles.dynamicInfo}>
											<Text style={styles.name}>
													{
															get(feed.userVO,'userName','探熊')
													}
											</Text>
											<View style={styles.infoBox}>
													<Text style={styles.infoTime}>
															{this.getDate(feed.publishTime)}
													</Text>
											</View>
									</View>
							</View>
							<View style={styles.dynamicTextBox}>
									<TouchableOpacity onPress={() => this.handleGoDetail(feed.id)}>
										<Text style={styles.dynamicText}>
												{feed.content}
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
									<View style={styles.operationItem1}>
											<Image
													source={imageUrl.like}
													style={styles.operationIcon}
											/>
											<Text style={styles.operationText}>点赞{feed.likeNum}</Text>
									</View>
									<View style={styles.operationItem2}>
											<Image
													source={imageUrl.comment}
													style={styles.operationIcon}
											/>
											<Text style={styles.operationText}>已评论{feed.commentNum}</Text>
									</View>
									<View style={styles.operationItem3}>
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
			paddingHorizontal:30,
			borderBottomColor:'#F2F2F2',
			borderBottomWidth:scaleSize(1),
			borderStyle:'solid'
	},
	itemHeader: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: scaleSize(45),
			marginBottom: scaleSize(10),
	},
	dynamicInfo: {
			flex: 1,
	},
	avatarInner: {
		width: 66, 
		height: 66, 
		borderRadius: 33,
		marginRight: scaleSize(40),
	},
	name: {
			color: '#564F5F',
			marginTop: scaleSize(20),
			marginBottom: scaleSize(20),
			fontSize: 18,
			fontWeight: '400'
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
	operationItem1: {
			display: 'flex',
			flexDirection: 'row',
			flex: 1,
			alignItems: 'center',
		},
		operationItem2: {
			display: 'flex',
			flexDirection: 'row',
			flex: 1,
			alignItems: 'center',
			justifyContent:'center',
	},
	operationItem3: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent:'flex-end'
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
			lineHeight:scaleSize(120),
			height:scaleSize(120),
			borderRadius:scaleSize(60)
	},
	viewDetailBtnText:{
			color:'#fff',
			fontSize:scaleFont(40)
	},
	infoPosition:{
		fontSize: 12,
    color: '#999999',
	},
	infoTime:{
		fontSize: 12,
    color: '#999999',
	}
});