/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**
 *  我的
 */

import React,{Component,Fragment} from 'react';
import {StyleSheet,Image, ImageBackground, Text, View,SafeAreaView,ScrollView} from 'react-native';
import DynamicTab from '../mine/index/dynamicTab';
import PersonalInfo from '../mine/index/personalInfo';
import {GetRequest} from '../../utils/request';
import {scaleSize, scaleFont} from '../../utils/scaleUtil';

const imageUrl = {
    configIcon: require('../../assets/mine/download-icon.png'),
    avatarBg: require('../../assets/mine/avatar-bg.png'),
    avatar: require('../../assets/mine/avatar.jpeg'),
    sexIcon: require('../../assets/mine/QR-icon.png'),
    netIcon: require('../../assets/mine/QR-icon.png'),
    hobbyIcon: require('../../assets/mine/bulb.png'),
    locationIcon: require('../../assets/mine/local.png'),
    QRCodeIcon: require('../../assets/mine/QR-icon.png'),
    EditIcon: require('../../assets/mine/edit.png'),
    done: require('../../assets/mine/undone-icon.png'),
    wareHouse: require('../../assets/mine/warehouse-icon.png'),
		unDone: require('../../assets/mine/undone-icon.png'),
		relative:require('../../assets/stranger/guanxilian.png'),
};

export default class Mine extends Component{
	constructor(props){
		super(props)
		this.state = {
			personalInfo : {},
			isFriend:true,
			uid:this.props.navigation.state.params.uid
		}
	}
	
	componentWillMount(){
		console.log(this.props.navigation.state)
		GetRequest('user/userInfo',{userId:this.state.uid}).then(res => {
			this.setState({
				personalInfo:res.data
			})
		})
	}
	render(){
			return (
				<Fragment>
					<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
					<SafeAreaView>
					<ScrollView>
							<View>
							<ImageBackground style={styles.persionalTab} source={imageUrl.avatar}>
									<View style={styles.bgaWrapper}>
											<PersonalInfo personalInfo={this.state.personalInfo}/>
									</View>
							</ImageBackground>
							<View style={styles.operateBox}>
								{
									this.state.isFriend
									?
									<>
										<View style={styles.chatBox}>
											<View style={styles.centerStyle}>
												<Image style={styles.operateIcon} source={imageUrl.relative}/>
												<Text style={styles.operateText}>
													聊天
												</Text>
											</View>
										</View>
										<View style={styles.relativeBox}>
											<View style={styles.centerStyle}>
												<Image style={styles.operateIcon} source={imageUrl.relative}/>
												<Text style={styles.operateText}>关系链</Text>
											</View>
										</View>
									</>
									:
									<View style={styles.chatBox}></View>
								}
							</View>
							<View style={styles.lineSpace}/>
							<DynamicTab uid={this.state.uid} personalInfo={this.state.personalInfo} {...this.props}/>
					</View>
					</ScrollView>
				</SafeAreaView>
				</Fragment>
			)
	}
}

const styles = StyleSheet.create({
	persionalTab: {},
	bgaWrapper: {
			width: '100%',
			height: scaleSize(1157),
			padding: scaleSize(54),
			backgroundColor: 'rgba(0,0,0,.5)',
	},
	settingBox: {
			margin: scaleSize(56),
			height: scaleSize(48),
			width: scaleSize(140),
			position: 'absolute',
			right: 0,
			display: 'flex',
			flexDirection: 'row',
	},
	configIcon: {
			width: scaleSize(48),
			height: scaleSize(48),
			marginRight: scaleSize(12),
	},
	configFont: {
			fontSize: scaleFont(39),
			color: '#fff',
	},
	operationBox: {
			marginTop: scaleSize(54),
			height: scaleSize(76),
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingLeft: scaleSize(40),
			paddingRight: scaleSize(40),
	},
	operationBtn: {
			width: scaleSize(243),
			height: scaleSize(76),
			backgroundColor: '#fff',
			fontSize: scaleFont(36),
			color: '#ccc',
			borderRadius: scaleSize(38),
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems:'center'
	},
	btnIcon: {
			width: scaleSize(32),
			height: scaleSize(32),
	},
	btnText: {
			fontSize: scaleFont(36),
			color: '#333',
	},
	leftBtn: {
			marginRight: scaleSize(85),
	},
	lineSpace: {
			height: scaleSize(24),
			backgroundColor: '#f2f2f2',
	},
	operateBox:{
		height:scaleSize(260),
		backgroundColor:'#fff',
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	chatBox:{
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:"#f2f2f2",
		width:scaleSize(370),
		height:scaleSize(150),
		borderRadius:scaleSize(18),
		marginRight:scaleSize(112)
	},
	relativeBox:{
		display:'flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:"#f2f2f2",
		width:scaleSize(370),
		height:scaleSize(150),
		borderRadius:scaleSize(18)
	},
	centerStyle:{
		display:'flex',
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	operateIcon:{
		width:scaleSize(70),
		height:scaleSize(63),
		marginRight:scaleSize(33)
	},
	operateText:{
		fontSize:scaleFont(45),
		color:'#333'
	}
});
