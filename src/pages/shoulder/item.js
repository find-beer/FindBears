import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {scaleSize} from '../../utils/scaleUtil';
const defaultImg = require('../../assets/mine/avatar.jpeg');
import{get} from 'lodash'

export default class Shoulder extends React.Component {
  constructor(props){
    super(props)
  }
  handleJoinTalk(){
    console.log(this.props)
  }
  handlegoDetail(){
    this.props.navigation.navigate('ActivityDetail', {id: this.props.item.id})
  }
  render(){
    const item = this.props.item;
    let url = item.picUrl?item.picUrl.splice(',')[0]:''
    return (
      <View style={styles.activity_item} >
        <TouchableOpacity onPress={() => this.handlegoDetail()}>
          <Image style={styles.item_image} source={url?{uri:url}:defaultImg}/>
          <Text style={styles.item_title} numberOfLines={1}>{item.activityTitle}</Text>
          <Text style={styles.item_money}>费用：￥{item.price}</Text>
          <Text style={styles.item_date}>时间：{item.publishTime}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleJoinTalk()}>
          <View style={styles.join_talk_btn}>
            <Text style={styles.join_talk_txt}>加入群聊</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  activity_item:{
    width:'49%',
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
    paddingBottom:scaleSize(60)
  },
  item_image:{
    width:scaleSize(460),
    height:scaleSize(420),
    borderRadius:scaleSize(12),
    backgroundColor: '#43B4FC',
    marginBottom:scaleSize(30)
  },
  item_title:{
    fontSize: scaleSize(40),
    color: '#564F5F',
    marginBottom:scaleSize(25)
  },
  item_money:{
    color: '#7765E5',
    fontSize:scaleSize(38),
    marginBottom:scaleSize(12)
  },
  item_date:{
    color: '#7765E5',
    fontSize:scaleSize(36),
    marginBottom:scaleSize(30)
  },
  join_talk_btn:{
    width:scaleSize(460),
    height:scaleSize(76),
    backgroundColor:'#564F5F',
    borderRadius:scaleSize(30),
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  join_talk_txt:{
    color: '#ffffff',
    fontSize:scaleSize(36),
  }
})