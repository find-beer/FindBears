import React, {Component} from 'react';
import {StyleSheet,View, Text, Image,TouchableOpacity} from 'react-native';
const imageUrl = {
		like: require('../../../assets/home/like.png'),
		unlike: require('../../../assets/home/unlike.png'),
    comment: require('../../../assets/mine/comment.png'),
		share: require('../../../assets/mine/share-icon.png'),
		more: require('../../../assets/mine/more.png'),
};
import {Modal,Toast} from '@ant-design/react-native';
import {get} from 'lodash'
import {scaleSize,scaleFont} from '../../../utils/scaleUtil';
import {PostRequest} from "../../../utils/request";
import {getDate} from '../../../utils/date'
import EventBus from '../../../utils/EventBus';
export default class DynamicItem extends Component {
    constructor(props) {
				super(props);
				this.state = {
					feed:{...this.props.feed},
					isMine:this.props.isMine
				}
    }
    handleGoDetail(){
			this.props.navigation.navigate('DynamicDetail', {id: this.state.feed.id})
		}
		handleGoStrangerPage(){
			this.props.navigation.navigate('StrangerInfo', {uid: this.state.feed.userVO?.userId || ''})
		}
		handleLike(){
			PostRequest('like/operate',{
				infoId: this.state.feed.id,
				infoType: 2,
				state: this.state.feed.like?0:1,
			}).then(res => {
				if(this.state.feed.like){
					this.setState({
						feed:{
							...this.state.feed,
							like:false,
							likeNum:this.state.feed.likeNum-1
						}

					})
				}else{
					this.setState({
						feed:{
							...this.state.feed,
							like:true,
							likeNum:this.state.feed.likeNum+1
						}
					})
				}
				// EventBus.post('REFRESH_TREND',{})
			})
		}
		handleDelete(){
			Modal.alert('提示', '确认删除该动态么', [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel',
        },
        { text: '删除', onPress: this.delete() },
      ]);
		}
		delete(){
			PostRequest('/feed/delete',{id:this.state.feed.id}).then(res => {
				if(res.code === 0){
					Toast.success('删除成功', 2);
					EventBus.post("REFRESHMINE")
				}else{
					Toast.success('删除失败，请重试', 2);
				}
			})
		}
    render() {
			const feed = this.state.feed;
			const picList = feed.picUrl? feed.picUrl.split(',')  : []
			let pic = /https/.test(get(feed.userVO, 'pic', ''))?get(feed.userVO, 'pic', ''):'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1817066819,1530157012&fm=11&gp=0.jpg'
			return (
					<View style={styles.dynamicItemWrap} >
							<View style={styles.itemHeader}>
									<TouchableOpacity onPress={() => this.handleGoStrangerPage()}>
										<Image
												source={{uri: pic}}
												style={styles.avatarInner}
										/>
									</TouchableOpacity>
									<View style={styles.dynamicInfo}>
											<Text style={styles.name}>
													{
															get(feed.userVO,'userName','探熊')
													}
											</Text>
											<View style={styles.infoBox}>
													<Text style={styles.infoTime}>
															{getDate(feed.publishTime)}
													</Text>
											</View>
									</View>
									{
										this.state.isMine?
										<TouchableOpacity onPress={() => this.handleDelete()}>
											<Image source={imageUrl.more} style={styles.operateBtn}/>
										</TouchableOpacity>
										:null
									}
							</View>
							<View style={styles.dynamicTextBox}>
									<TouchableOpacity onPress={() => this.handleGoDetail()}>
										<Text style={styles.dynamicText}>
												{feed.content}
										</Text>
									</TouchableOpacity>
									<View style={styles.imgBox}>
											{
													picList.map(item => {
															return(
																	<Image
																			source={{uri:item}}
																			style={styles.dynamicImg}
																			key={item}
																	/>
															)
													})
											}
									</View>
							</View>
							<View style={styles.operationBox}>
									<TouchableOpacity
									style={styles.operationItem1}
									onPress={() => this.handleLike()}>
											<Image
													source={feed.like?imageUrl.like:imageUrl.unlike}
													style={styles.operationIcon}
											/>
											<Text style={styles.operationText}>点赞{feed.likeNum}</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.operationItem2}
										onPress={() => this.handleGoDetail()}>
											<Image
													source={imageUrl.comment}
													style={styles.operationIcon}
											/>
											<Text style={styles.operationText}>已评论{feed.commentNum}</Text>
									</TouchableOpacity>
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
	operateBtn:{
		width:scaleSize(100),
		height:scaleSize(30),
		backgroundColor:'red'
	},
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
			justifyContent:'space-between',
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
	},
});
