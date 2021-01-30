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
import {StyleSheet,Image, ImageBackground, Text, View,TouchableOpacity,ScrollView} from 'react-native';
import DynamicTab from './dynamicTab';
import PersonalInfo from './personalInfo';
import {SafeAreaView} from 'react-navigation';
import {GetRequest} from '../../../utils/request';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';
import EventBus from "../../../utils/EventBus";
import {Provider} from '@ant-design/react-native';

const imageUrl = {
    configIcon: require('../../../assets/mine/relation.png'),
    avatarBg: require('../../../assets/mine/avatar-bg.png'),
    avatar: require('../../../assets/mine/avatar.jpeg'),
    sexIcon: require('../../../assets/mine/QR-icon.png'),
    netIcon: require('../../../assets/mine/QR-icon.png'),
    hobbyIcon: require('../../../assets/mine/bulb.png'),
    locationIcon: require('../../../assets/mine/local.png'),
    QRCodeIcon: require('../../../assets/mine/QR-icon.png'),
    EditIcon: require('../../../assets/mine/edit.png'),
    done: require('../../../assets/mine/undone-icon.png'),
    wareHouse: require('../../../assets/mine/warehouse-icon.png'),
    unDone: require('../../../assets/mine/undone-icon.png'),
};

export default class Mine extends Component{
	state = {
		personalInfo : {
			headPicUrl:''
		}
	}
	componentWillMount(){
		this.initInfo()
	}
	initInfo(){
		GetRequest('user/detail').then(res => {
			this.setState({
				personalInfo:res.data
			})
		})
	}
	componentDidMount(){
		EventBus.on('REFRESHMINE',() => {
			this.initInfo()
		})
	}
	handleGoCode(){
		this.props.navigation.navigate('QrCode')
	}
	handleGoStore(){
		this.props.navigation.navigate('Store')
	}
	handleGoEdit(){
		this.props.navigation.navigate('EditInfo',this.state.personalInfo)
	}
	handleGoConfig(){
		this.props.navigation.navigate('Config')
	}
	render(){
			return (
				<Provider>
					<Fragment>
					<SafeAreaView style={{flex: 0, backgroundColor: 'rgba(117,117,115,1)'}}/>
					<SafeAreaView style={{flex:1}}>
						<ScrollView>
								<ImageBackground 
								style={styles.persionalTab} 
								source={{uri:this.state.personalInfo.headPicUrl?.replace('https','http')}}
								>
									<View style={styles.bgaWrapper}>
										<TouchableOpacity onPress={() => this.handleGoConfig()}>
											<View style={styles.settingBox}>
												<Image
													source={imageUrl.configIcon}
													style={styles.configIcon}
												/>
												<Text 
													style={styles.configFont}
												>设置</Text>
											</View>
										</TouchableOpacity>
										<PersonalInfo personalInfo={this.state.personalInfo}/>
										<View style={styles.operationBox}>
													<TouchableOpacity onPress={() => this.handleGoCode()}>
														<View style={styles.operationBtn}>
																<Image
																		source={imageUrl.QRCodeIcon}
																		style={styles.btnIcon}
																/>
																<Text
																	style={styles.btnText}
																>二维码</Text>
														</View>
													</TouchableOpacity>
													<TouchableOpacity onPress={() => this.handleGoStore()}>
														<View style={styles.operationBtn}>
																<Image
																		source={imageUrl.EditIcon}
																		style={styles.btnIcon}
																/>
																<Text
																	style={styles.btnText}

																>仓库</Text>
														</View>
													</TouchableOpacity>
													<TouchableOpacity onPress={() => this.handleGoEdit()}>
														<View style={styles.operationBtn}>
																<Image
																		source={imageUrl.EditIcon}
																		style={styles.btnIcon}
																/>
																<Text
																	style={styles.btnText}

																>编辑资料</Text>
														</View>
													</TouchableOpacity>
											</View>
									</View>
							</ImageBackground>
							<View style={styles.lineSpace}/>
							<DynamicTab personalInfo={this.state.personalInfo} {...this.props}/>
						</ScrollView>
					</SafeAreaView>
				</Fragment>
				</Provider>
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
			position:'relative'
	},
	settingBox: {
		height: scaleSize(48),
		display: 'flex',
		flexDirection: 'row',
		justifyContent:'flex-end',
		zIndex:100
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
});
