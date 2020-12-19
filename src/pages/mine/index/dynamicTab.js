import React, {Component} from 'react';
import {StyleSheet,View, Text} from 'react-native';

// import DynamicItem from './dynamicItem'
import DynamicItem from '../../home/trends/feedItem'
import ActivityItem from './activityItem'
import {GetRequest} from '../../../utils/request';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';
import EventBus from '../../../utils/EventBus';
import AsyncStorage from "@react-native-community/async-storage";


export default class DynamicTab extends Component {
		constructor(props){
			super(props)
			this.state= {
				uid:this.props.uid,
				currentTab: 'dynamic',
				activityList:[],
				dynamicList:[],
				loginUserId:false,
				pageInfo:{
					pageSize:500,
					pageNum:1
				}
			}
		}
		componentDidMount(){
			EventBus.on('REFRESHMINE',() => {
				this.initInfo()
			})
			AsyncStorage.getItem('userInfo', (error, result) => {
				if(!result) return;
				let res = JSON.parse(result) || {};
				this.setState({
					loginUserId:res.userId
				})
			})
		}
    changeTab(name){
        this.setState({
            currentTab:name
        })
		}
		requestCurrent(){
			GetRequest('activity/user',this.state.pageInfo).then(res => {
				this.setState({
					activityList:res.data || []
				})
			})
			GetRequest('feed/user',this.state.pageInfo).then(res => {
				this.setState({
					dynamicList:[...res.data] || []
				})
			})
		}
		requestStranger(){
			GetRequest('user/activityList',{userId:this.state.uid,...this.state.pageInfo}).then(res => {
				this.setState({
					activityList:res.data || []
				})
			})
			GetRequest('user/feedList',{userId:this.state.uid,...this.state.pageInfo}).then(res => {
				this.setState({
					dynamicList:res.data || []
				})
			})
		}
		componentDidMount(){
			this.state.uid?this.requestStranger():this.requestCurrent()
			EventBus.on('REFRESH_TREND',()=>{
				this.state.uid?this.requestStranger():this.requestCurrent()
			})	
		}
    render() {
        return (
            <View style={styles.tabWrapper}>
                <View style={styles.tabHeader}>
									<View
										style={styles.tabItem}
										onPress={() => {
												this.state.currentTab = 'dynamic';
										}}>
											<Text
													style={
															this.state.currentTab === 'dynamic'
																	? [styles.tabText, styles.tabTextActive]
																	: styles.tabText
													}
													onPress={() => this.changeTab('dynamic')}>
													动态
											</Text>
											{this.state.currentTab === 'dynamic' ? (
													<View style={styles.tabBar} />
											) : null}
                    </View>
                    <View
											style={styles.tabItem}
											onPress={() => {
												this.state.currentTab = 'activity';
											}}>
											<Text
												style={
													this.state.currentTab === 'activity'
														? [styles.tabText, styles.tabTextActive]
														: styles.tabText
												}
												onPress={() => this.changeTab('activity')}>
												活动
											</Text>
											{this.state.currentTab === 'activity' ? (
													<View style={styles.tabBar} />
											) : null}
                    </View>
                    
                </View>
                {
									this.state.currentTab === 'activity'
									?
									<View style={styles.listBg}>
										{
											this.state.activityList.map((item,index) => {
												return <ActivityItem item={item} key={`activity${index}`}  {...this.props}/>
											})
										}
									</View>
									:
									<View style={styles.listBg}>
										{
											this.state.dynamicList.map((item,index) => {
												return <DynamicItem 
													feed={item} 
													loginUserId={this.state.loginUserId}
													key={item.id} 
													isMinePage={true}
													{...this.props}
													/>
											})
										}
									</View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  tabWrapper: {},
  tabHeader: {
		paddingTop:scaleSize(30),
		paddingLeft: scaleSize(357),
		paddingRight: scaleSize(357),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor:'#fff',
		borderBottomColor:'#f2f2f2',
		borderBottomWidth:scaleSize(1),
		borderStyle:'solid'
  },
  tabItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: scaleSize(130),
  },
  tabText: {
      fontSize: scaleFont(42),
      color: '#999',
  },
  tabTextActive: {
      fontSize: scaleFont(48),
      color: '#564f5f',
  },
  tabBar: {
      width: scaleSize(50),
      height: scaleSize(4),
      borderRadius: scaleSize(2),
      backgroundColor: '#564f5f',
      marginTop: scaleSize(10),
      marginLeft: scaleSize(20),
	},
	listBg:{
		backgroundColor:'#fbfbfb'
	}
});
