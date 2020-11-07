import React from 'react';
import {FlatList, StyleSheet, View, SafeAreaView,Text,Image} from 'react-native';
import Header from '../../../components/header/index'
import ActivityItem from "../../../components/activity_item/activityItem";
import { scaleSize,scaleFont } from '../../../utils/scaleUtil';
const horn = require('../../../assets/chat/horn.png')


export default class ActivityList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      relationDetailList: [{
        cityName: "北京",
        commentNum: 0,
        content: "钱罗罗公司成立盛典",
        id: 0,
        like: false,
        likeNum: 0,
        location: "北京",
        picUrl: "string",
        publishTime: new Date().getTime(),
        userVO: {
          order: 0,
          pic: "string",
          userId: 0,
          userName: "string"
        },
        videoUrl: "string"
    },{
        cityName: "北京",
        commentNum: 0,
        content: "钱罗罗公司成立盛典",
        id: 2,
        like: false,
        likeNum: 0,
        location: "北京",
        picUrl: "string",
        publishTime: new Date().getTime(),
        userVO: {
          order: 0,
          pic: "string",
          userId: 0,
          userName: "string"
        },
        videoUrl: "string"
    }],
    };
  }
  goDetail(route,item){
    this.props.navigation.navigate(route, {
        id: item.id
    })
  }
  renderItem = (rowData) => {
    const activity = rowData.item.activityDetailVO;
    return (
        <ActivityItem onBtnClick={() => goDetail(activity)} {...this.props} activity={activity}/>
    );
  }
  render() {
    const {relationDetailList} = this.state;
    return( 
    <SafeAreaView style={styles.container}>
        <Header title="活动列表" left={null} />
        <View style={styles.horn_wrapper}>
          <View style={styles.horn_box}>
            <Image source={horn} style={styles.horn_icon}/>
            <View>
              <Text style={styles.horn_txt}>此处只展示关系网内活动</Text>
            </View>
          </View>
        </View>
        <FlatList
            data={relationDetailList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item + index}
        />
    </SafeAreaView>);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  horn_wrapper:{
    display:'flex',
    justifyContent:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:scaleSize(30),
    marginBottom:scaleSize(10)
  },
  horn_box:{
    display:'flex',
    flexDirection:'row',
    width:scaleSize(970),
    height:scaleSize(80),
    borderRadius:scaleSize(40),
    backgroundColor:'#f2f2f2',
    paddingHorizontal:scaleSize(40),
    alignItems:'center'
  },
  horn_icon:{
    width:scaleSize(50),
    height:scaleSize(50),
    marginRight:scaleSize(30)
  },
  horn_txt:{
    fontSize:scaleFont(36),
    color:'#333'
  }
});