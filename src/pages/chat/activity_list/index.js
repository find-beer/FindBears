/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:54:57
 * @LastEditTime : 2021-02-28 15:38:58
 * @FilePath     : /src/pages/chat/activity_list/index.js
 */
import React,{
  Fragment
} from 'react';
import {FlatList, StyleSheet, View,Text,Image,SafeAreaView} from 'react-native';
import Header from '../../../components/header/index'
import ActivityItem from "../../../components/activity_item/activityItem";
import { scaleSize,scaleFont } from '../../../utils/scaleUtil';
const horn = require('../../../assets/chat/horn.png')


export default class ActivityList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      relationDetailList: []
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
      <Fragment>
				<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <SafeAreaView  reaView style={styles.container}>
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
        </SafeAreaView>
      </Fragment>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  horn_wrapper:{
    display:'flex',
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
