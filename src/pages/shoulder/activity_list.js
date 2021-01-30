import React, { Component,Fragment } from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
import {SafeAreaView} from 'react-navigation';
import Header from '../../components/header/index'
import ActivityItem from './item'
import {GetRequest} from "../../utils/request";
import { scaleSize } from '../../utils/scaleUtil';

export default class ActivityList extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.navigation.state.params.title,
      type:this.props.navigation.state.params.type,
      activityList:[]
    }
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
            <Header {...this.props} title={this.state.title} left={null} />
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
  activity_list_wrapper: {
    backgroundColor:'#fff',
    height: '100%'
  },
  list_box:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    paddingHorizontal:scaleSize(55),
    paddingVertical: scaleSize(30),
  },
});
