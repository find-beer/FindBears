/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:57:04
 * @LastEditTime : 2021-01-24 00:11:58
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
class ActivityList extends Component {
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
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <ScrollView>
          <SafeAreaView style={styles.activity_list_wrapper}>
            {/* <Header {...this.props} title={this.state.title} left={null} /> */}
            <View style={styles.list_box}>
              {
                this.state.activityList.map(item => {
                  return <ActivityItem item={item} key={item.id} {...this.props}/>
                })
              }
            </View>
          </SafeAreaView>
        </ScrollView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  list_box:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    paddingHorizontal:scaleSize(55),
  }
});

export default connect(bindState, bindActions)(ActivityList)
