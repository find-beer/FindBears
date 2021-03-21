/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:57:04
 * @LastEditTime : 2021-02-28 15:13:01
 * @FilePath     : /src/pages/shoulder/activity_list.js
 */
import React, { Component,Fragment } from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import Header from '../../components/header/index'
import ActivityItem from './item'
import {GetRequest} from "../../utils/request";
import { scaleSize } from '../../utils/scaleUtil';
import { bindActions, bindState, connect } from './../../redux'
export default class ActivityList extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props);
    this.state = {
      title: props.route.params.title,
      type: props.route.params.type,
      activityList:[]
    }
    props.navigation.setOptions({
      title: props.route.params.title,
      type: props.route.params.type,
    })
  }
  componentDidMount(){
    this.initData()
  }
  initData(){
    GetRequest('activity/activities',{
      activityValid:-1,
			pageSize:100,
			pageNum:1,
			activityType:this.state.type
    }).then(res => {
      this.setState({
        activityList:res.data
      })
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <Header {...this.props} title={this.state.title} left={null} />
        <ScrollView>
          <SafeAreaView style={styles.activity_list_wrapper}>
            <View style={styles.list_box}>
              {
                this.state.activityList.map(item => {
                  return <ActivityItem item={item} key={item.id} {...this.props}/>
                })
              }
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fa'
  },
  list_box:{
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  }
});
