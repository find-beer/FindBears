/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, View,Image,Text,TouchableOpacity} from 'react-native';
import Header from "../../components/header";
import {GetRequest} from "../../utils/request";
import { scaleSize, scaleFont } from '../../utils/scaleUtil';

const addIcon = require('../../assets/chat/addFriend.png')
const addArrow = require('../../assets/mine/arrow_right.png')

export default class FriendsList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            friendList:[]
        }
    }
    componentDidMount(){
        GetRequest('userRelation/listDirect').then(res => {
            this.setState({
                friendList:res.data
            })
        })
		}
		handleGoNewFriendPage(item){
			this.props.navigation.navigate('StrangerInfo', {uid: item.userVO?.userId || ''})
		}
    render() {
        return (
					<Fragment>
							<SafeAreaView style={{backgroundColor: 'white'}}>
							<View style={styles.main}>
								<TouchableOpacity onPress={() => this.handleGoNewFriendPage()}>
									<View style={styles.newFriendBox}>
										<View style={styles.newFriendIconBox}>
											<Image style={styles.newFriendIcon} source={addIcon}/>
										</View>
										<Text style={styles.friendTxt}>新的朋友</Text>
										<Image style={styles.newFriendArrow} source={addArrow}/>
									</View>
								</TouchableOpacity>
								{
										this.state.friendList?.map(item => {
												return (
													<TouchableOpacity onPress={() => this.handleGoNewFriendPage(item)}>
														<View style={styles.friendItem}>
															<Image style={styles.itemHeadPic} source={{'uri':item.headPicUrl || 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1817066819,1530157012&fm=11&gp=0.jpg'}}/>
															<Text style={styles.friendTxt}>{item.adName || '探熊'}</Text>
														</View>
													</TouchableOpacity>
												)
										})
								}
							</View>
						</SafeAreaView>
					</Fragment>
				)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
		},
		main:{
			paddingHorizontal:scaleSize(54),
			backgroundColor:'#fff'
		},
		newFriendBox:{
			display:'flex',
			flexDirection:'row',
			height:scaleSize(240),
			alignItems:'center',
			borderBottomWidth:scaleSize(2),
			borderColor:'#f2f2f2',
			borderStyle:'solid'
		},
		newFriendIconBox:{
			width:scaleSize(132),
			height:scaleSize(132),
			borderRadius:scaleSize(66),
			borderStyle:'solid',
			borderColor:'#f2f2f2',
			borderWidth:scaleSize(5),
			marginRight:scaleSize(42),
			display:'flex',
			justifyContent:'center',
			alignItems:'center',
			flexDirection:'row'
		},
		newFriendIcon:{
			width:scaleSize(80),
			height:scaleSize(80),
		},
		friendTxt:{
			flex: 1,
			color:'#333',
			fontSize:scaleFont(48)
		},
		newFriendArrow:{
			width:scaleSize(70),
			height:scaleSize(70)
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
		itemHeadPic:{
			width:scaleSize(132),
			height:scaleSize(132),
			marginRight:scaleSize(42)
		}
});
