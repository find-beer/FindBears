/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:54:57
 * @LastEditTime : 2021-03-06 20:22:29
 * @FilePath     : /src/pages/chat/interactive/index.js
 */
import React,{Fragment} from 'react';
import {FlatList, StyleSheet, View, SafeAreaView,Text,Image} from 'react-native';
import {GetRequest} from "../../../utils/request";
import Header from '../../../components/header/index'
import { scaleSize,scaleFont } from '../../../utils/scaleUtil';
const likeIcon = require('../../../assets/home/like.png')
const defaultHeader = require('../../../assets/mine/avatar.jpeg')

export default class InteractiveList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interactiveList:[{
        headPic:'',
        name:'王二狗',
        type:'comment',
        comment:'憨憨一个'
      },
      {
        headPic:'',
        name:'王二狗',
        type:'like',
      }]
    }
  }
  componentDidMount(){
    // GetRequest('',).then(res => {
    // })
  }
  renderItem(data){
    const item = data.item;
    return (
      <View style={styles.list_item}>
        <Image style={styles.head_pic} source={item.headPic || defaultHeader}/>
        <Text style={styles.item_txt}>
          {
            item.type === 'comment'
            ?
            `${item.name}评论了你：${item.comment}`
            :
            `${item.name}点赞了你的动态`
          }
        </Text>
        {
          item.type !== 'comment'
          ?
          <Image style={styles.like_icon} source={likeIcon}/>
          :<></>
        }
      </View>
    )
  }
  render(){
    return (
      <Fragment>
				<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <SafeAreaView style={styles.container}>
          <FlatList
              data={this.state.interactiveList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item + index}
          />
        </SafeAreaView>
      </Fragment>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff'
  },
  list_item:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:scaleSize(50),
    paddingHorizontal:scaleSize(50),
    borderBottomColor:'#f2f2f2',
    borderStyle:'solid',
    borderBottomWidth:scaleSize(1)
  },
  head_pic:{
    borderRadius:scaleSize(75),
    width:scaleSize(150),
    height:scaleSize(150),
    marginRight:scaleSize(30)
  },
  item_txt:{
    fontSize:scaleFont(42),
    color:'#333'
  },
  like_icon:{
    width:scaleSize(60),
    height:scaleSize(60),
  }
})