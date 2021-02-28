import React, {Component,Fragment}  from 'react';
import {StyleSheet, View, Text, ImageBackground, SafeAreaView} from 'react-native';
import { scaleSize,scaleFont } from '../../utils/scaleUtil';
import Header from '../../components/header/index'
import {GetRequest} from '../../utils/request';
import AsyncStorage from "@react-native-community/async-storage";
import { connect, bindActions, bindState } from './../../redux'
class RelationChain extends Component {
	constructor(props){
		super(props);
		this.state = {
			relationChain:[],
			length:0,
			personalInfo:{
				pic:'',
				name:'',
				token:'',
			}
		}
	}
	componentWillMount(){
		const { headPicUrl, name, token  } = this.props.userInfo
		this.setState({
			personalInfo:{
				pic:headPicUrl,
				name: name,
				token: token
			}
		})
		this.initChain();
	}
	initChain = async () => {
		const { succes, data, msg }  = await this.props.get('/user/relation')
		if (success) {
			this.setState({
				relationChain: data || []
			})
		}
	}
	render() {
		let length = this.state.relationChain.length;
		let lastOne = this.state.relationChain.pop();
		let relationChain = this.state.relationChain;
		let leftSome = [...relationChain];
		leftSome.pop();
		return (
			<Fragment>
				<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
				<SafeAreaView style={styles.main}>
						<View style={styles.container}>
								{/*  基本信息 */}
								<ImageBackground
										source={images.bgIntro}
										style={styles.intro}>
										<View style={styles.mine}>
												<ImageBackground
														source={{uri:this.state.personalInfo.pic}}
														style={styles.introHeadshot}
												/>
												<Text style={styles.introName}>
													{this.state.personalInfo.name}
												</Text>
										</View>
										<View style={styles.chainBox}>
											<ImageBackground
													source={images.chainShort}
													style={styles.chainIcon}
											/>
											<View style={styles.chain} >
												<Text style={styles.chainText}>5V好友</Text>
											</View>
											<ImageBackground
													source={images.chainShort}
													style={styles.chainIcon}
											/>
											</View>
											<View style={styles.friend}>
													<ImageBackground
															source={{uri:relationChain.length?relationChain[length - 1].pic:''}}
															style={styles.introHeadshot}
													/>
													<Text style={styles.introName}>
														{relationChain.length?relationChain[length - 1].userName:''}
													</Text>
										</View>
								</ImageBackground>

								{/* 详细信息 */}
								{ length ?
									<View style={styles.detail}>
										<Text style={styles.detailTitle}>详细关系链</Text>
										<View style={styles.detailContent}>
												<View style={styles.detailLeft}>
													{leftSome.map(item => {
														<View>
															<ImageBackground
																	source={{uri:item.pic}}
																	style={styles.detailHeadshot}
															/>
															<Text style={styles.detailName}>
																	{item.name}
															</Text>
													</View>
													})}
												</View>
												<ImageBackground
														source={images.chainLong}
														style={styles.chainLong}
												/>
												<View style={styles.detailRight}>
														<View>
																<ImageBackground
																		source={{uri:lastOne.pic}}
																		style={styles.detailHeadshot}
																/>
																<Text style={styles.detailName}>
																		{lastOne.userName}
																</Text>
														</View>
												</View>
										</View>
									</View>
									:
									null
								}
								{/* 提示信息 */}
								<View style={styles.tips}>
										<View style={styles.row1}>
												<ImageBackground
														source={images.bearPurple}
														style={styles.tipsHeadshot}
												/>
												{/* <ImageBackground
														source={images.chainLong}
														style={styles.tipsLeft}
												/> */}
												<View style={styles.tipsLeft}>
													<Text style={styles.tipsText}>
														好厉害啊，已经扩展了这么多人脉，请再接再厉吧
													</Text>
												</View>
										</View>
										<View style={styles.row2}>
												{/* <ImageBackground
														source={images.chainLong}
														style={styles.tipsRight}
												/> */}
												<View style={styles.tipsRight}>
													<Text style={styles.tipsText}>
														快去打开更多关系链，呼朋唤友等你来
													</Text>
												</View>
												<ImageBackground
														source={images.bearGray}
														style={styles.tipsHeadshot}
												/>
										</View>
								</View>
						</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
export default connect(bindState, bindActions)(RelationChain)
const images = {
    bgIntro: require('../../assets/relationChain/bg-intro.png'),
    bearGray: require('../../assets/relationChain/bear-gray.png'),
    bearPurple: require('../../assets/relationChain/bear-purple.png'),
    chainShort: require('../../assets/relationChain/chain-short.png'),
    chainLong: require('../../assets/relationChain/chain-long.png'),
};

const styles = StyleSheet.create({
    main:{
				backgroundColor:'#fff',
				height:'100%'
    },
    container: {
        paddingTop: scaleSize(66),
        paddingLeft: scaleSize(54),
        paddingRight: scaleSize(54),
        backgroundColor:'#fff',
    },
    intro: {
        width: '100%',
        height: scaleSize(428),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleSize(102),
    },
    mine: {
        alignItems: 'center',
    },
    friend: {
        alignItems: 'center',
    },
    introHeadshot: {
        width: scaleSize(180),
        height: scaleSize(180),
        marginBottom: scaleSize(23),
    },
    introName: {
        fontSize: scaleFont(36),
        color: '#FFFFFF',
    },
    detail: {
        marginBottom: scaleSize(170),
    },
    detailTitle: {
        fontSize: scaleFont(42),
        color: '#564F5F',
        marginBottom: scaleSize(54),
    },
    detailContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chainShort: {
        width: scaleSize(57),
        height: scaleSize(12),
        marginLeft: scaleSize(21),
        marginRight: scaleSize(21),
    },
    chainLong: {
        width: scaleSize(175.1),
        height: scaleSize(38.4),
        marginLeft: scaleSize(28.9),
        marginRight: scaleSize(28.9),
    },
    detailHeadshot: {
        width: scaleSize(132),
        height: scaleSize(132),
        marginBottom: scaleSize(28),
    },
    detailName: {
        fontSize: scaleFont(36),
        color: '#666666',
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: scaleSize(95),
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tipsHeadshot: {
        width: scaleSize(58),
        height: scaleSize(58),
        marginLeft: scaleSize(24),
        marginRight: scaleSize(24),
    },
    tipsLeft: {
        width: scaleSize(589),
				height: scaleSize(158),
				backgroundColor:'rgba(137,127,221,0.12)',
				borderRadius:scaleSize(9)
    },
    tipsRight: {
        width: scaleSize(589),
				height: scaleSize(158),
				backgroundColor:'rgba(137,127,221,0.37)',
				borderRadius:scaleSize(9)
		},
		tipsText:{
			color: '#564F5F',
			fontSize:scaleFont(38),
			textAlign:'center',
			paddingHorizontal:scaleSize(21),
			paddingVertical:scaleSize(34),
			lineHeight:scaleSize(43),
		},
		chainBox:{
			display:'flex',
			flexDirection:'row',
			justifyContent:'center',
			alignItems:'center'
		},
		chainIcon:{
			width:scaleSize(115),
			height:scaleSize(24)
		},
		chainText:{
			color:'#897FDD',
			fontSize:scaleSize(48),
		},
		chain: {
			width: scaleSize(216),
			height:scaleSize(90),
			borderRadius:scaleSize(4),
			backgroundColor:'#fff',
			display:'flex',
			justifyContent:'center',
			alignItems:'center'
	},
});
