import React, { Component } from 'react'
import { StyleSheet, View, Text, Image,SafeAreaView} from 'react-native'
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
    GetRequest('common/activitytype',{
      activityValid:0,
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
      <SafeAreaView style={styles.activity_list_wrapper}>
        <Header title={this.state.title} left={null} />
        <View style={styles.list_box}>
          {
            this.state.activityList.map(item => {
              return <ActivityItem item={item} key={item.id}/>
            })
          }
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  list_box:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    paddingHorizontal:scaleSize(55),
		justifyContent:'space-around'
  }
});
