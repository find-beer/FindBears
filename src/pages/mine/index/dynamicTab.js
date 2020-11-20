import React, {Component} from 'react';
import {StyleSheet,View, Text} from 'react-native';

// import DynamicItem from './dynamicItem'
import DynamicItem from '../../home/trends/feedItem'
import ActivityItem from './activityItem'
import {GetRequest} from '../../../utils/request';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';

export default class DynamicTab extends Component {
		constructor(props){
			super(props)
			this.state= {
				currentTab: 'dynamic',
				activityList:[],
				dynamicList:[],
				pageInfo:{
					pageSize:500,
					pageNum:1
				}
			}
		}
    handleChangeTab() {}
    changeTab(name){
        this.setState({
            currentTab:name
        })
		}
		componentDidMount(){
			GetRequest('activity/user',this.state.pageInfo).then(res => {
				this.setState({
					activityList:res.data || []
				})
			})
			GetRequest('feed/user',this.state.pageInfo).then(res => {
				this.setState({
					dynamicList:res.data || []
				})
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
									<View>
										{
											this.state.activityList.map((item,index) => {
												return <ActivityItem item={item} key={`activity${index}`}  {...this.props}/>
											})
										}
									</View>
									:
									<View>
										{
											this.state.dynamicList.map((item,index) => {
											return <DynamicItem feed={item} key={`dynamic${index}`}{...this.props}/>										})
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
      paddingLeft: scaleSize(357),
      paddingRight: scaleSize(357),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
});
