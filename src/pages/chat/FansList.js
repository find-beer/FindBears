/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import Header from "../../components/header";
import {GetRequest} from "../../utils/request";
import { scaleSize, scaleFont } from '../../utils/scaleUtil';

export default class MyFollow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fansList:[]
		}
	}
	handleGoNewFriendPage(item){
		this.props.navigation.navigate('StrangerInfo', {uid: item.userVO?.userId || ''})
	}
	componentDidMount(){
		GetRequest('userRelation/listFans').then(res => {
			this.setState({
				fansList:res.data
			})
		})
	}
	render() {
			return <Fragment>
					<SafeAreaView style={{backgroundColor: 'white'}}>
						<Header {...this.props} title={'我的粉丝'}/>
						<View style={styles.main}>
							{
								this.state.fansList.map(item => {
									return (
										<TouchableOpacity onPress={() => this.handleGoNewFriendPage(item)}>
											<View style={styles.friendItem}>
												<Image style={styles.friendHeadPic} source={{'uri':item.headPicUrl || 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1817066819,1530157012&fm=11&gp=0.jpg'}}/>
												<Text style={styles.friendTxt}>{item.name || '探熊'}</Text>
											</View>
										</TouchableOpacity>
									)
								})
							}
						</View>
					</SafeAreaView>
			</Fragment>;
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
		},
		main:{
			paddingHorizontal:scaleSize(54),
			backgroundColor:'#fff'
		},
		friendItem:{
			height:scaleSize(240),
			display:'flex',
			flexDirection:'row',
			alignItems:'center',
			borderBottomWidth:scaleSize(2),
			borderColor:'#f2f2f2',
			borderStyle:'solid'
		},
		friendHeadPic:{
			width:scaleSize(132),
			height:scaleSize(132),
			marginRight:scaleSize(42)
		},
		friendTxt:{
			flex: 1,
			color:'#333',
			fontSize:scaleFont(48)
		},
});
