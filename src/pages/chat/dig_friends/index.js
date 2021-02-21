import React,{
  Fragment
} from 'react';
import {
  StyleSheet, 
  View, 
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {Provider, Toast} from '@ant-design/react-native';
import {GetRequest} from "../../../utils/request";
import Header from '../../../components/header/index'
import { scaleSize,scaleFont } from '../../../utils/scaleUtil';
const defaultHeader = require('../../../assets/mine/avatar.jpeg')
const arrowIcon = require('../../../assets/mine/arrow_right.png')

export default class DigFriends extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchString:'',
      searchResult:{},
      requestList:[{
        headPic:'',
        requestName:'李二狗',
        requestInfo:'我是你同事',
        addStatus:1
      },{
        headPic:'',
        requestName:'王老三',
        requestInfo:'我是你老大',
        addStatus:0
      }]
    }
  }

  handleSearchFriend = (val) => {
    this.setState({
      searchString:val
    })
    this.setState({searchResult:{}})
    if(val.length === 11) {
      GetRequest(`/user/getUserByPhoneNumber/${val}`).then(res => {
        this.setState({
          searchResult: res.data
        })
      })
      return;
    }
  }

  handleAddFriend = () => {
    if(this.state.searchResult.uid){
      GetRequest(`/userRelation/addFriend/${this.state.searchResult.uid}`).then(res => {
        if(res.code === 0){
          Toast.success(res.msg || '添加成功');
        }else{
          Toast.fail(res.msg || '添加失败，请稍后重试');
        }
      })
    }
  }
  render(){
    return(
      <Provider>
        <Fragment>
				<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <SafeAreaView style={styles.container}>
          <Header {...this.props} title="挖好友" left={null} />
          <View style={styles.operate_box}>
            <View style={styles.search_wrapper}>
              <View style={styles.search_box}>
                <TextInput 
                  style={styles.search_input}
                  placeholder="输入手机号/探熊号" 
                  value={this.state.searchString}
                  onChangeText={(val) => this.handleSearchFriend(val)}
                  />
              </View>
            </View>
          </View>
          {this.state.searchResult?.name && 
            <View style={styles.searchList}>
              <View style={styles.list_item}>
                <Image style={styles.head_pic} source={this.state.searchResult.headPicUrl?{uri:this.state.searchResult.headPicUrl.replace('https','http')}:defaultHeader}/>
                <View style={styles.info_box}>
                  <Text style={styles.request_name}>
                    {this.state.searchResult.name}
                  </Text>
                </View>
                <TouchableOpacity onPress={this.handleAddFriend}>
                  <View style={styles.add_btn}>
                    <Text style={styles.btn_txt}>添加好友</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.line}></View>
            </View>
          }
          <View style={styles.operate_item}>
            <Text style={styles.label}>扫一扫</Text>
            <Image style={styles.arrow} source={arrowIcon}/>
          </View>
          <View style={styles.operate_item}>
            <Text style={styles.label}>手机联系人</Text>
            <Image style={styles.arrow} source={arrowIcon}/>
          </View>
          <View style={styles.line}></View>
          <View style={styles.main_list}>
            {
              this.state.requestList.map((item,index) => {
                return (
                  <View style={styles.list_item} key={index}>
                    <Image style={styles.head_pic} source={item.headPic?{uri:item.headPic}:defaultHeader}/>
                    <View style={styles.info_box}>
                      <Text style={styles.request_name}>
                        {item.requestName}
                      </Text>
                      <Text style={styles.request_info}>
                        {item.requestInfo}
                      </Text>
                    </View>
                    <Text style={styles.status_txt}>
                      {
                        item.addStatus?'已添加':''
                      }
                    </Text>
                    {
                      !item.addStatus
                      ?
                      <TouchableOpacity>
                        <View style={styles.view_btn}>
                          <Text style={styles.btn_txt}>查看</Text>
                        </View>
                      </TouchableOpacity>
                      :
                      <></>
                    }
                  </View>
                )
              })
            }
          </View>
      </SafeAreaView>
      </Fragment>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff',
  },
  search_wrapper:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  search_input:{
    width:'100%',
    height:'100%'
  },
  search_box:{
    width:scaleSize(970),
    height:scaleSize(125),
    borderRadius:scaleSize(12),
    backgroundColor:'#f2f2f2',
    paddingHorizontal:scaleSize(50)
  },
  operate_item:{
    paddingHorizontal:scaleSize(50),
    paddingVertical:scaleSize(70),
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:scaleSize(1),
    borderBottomColor:'#f2f2f2',
    borderStyle:'solid'
  },
  label:{
    fontSize:scaleFont(44),
    color:'#333'
  },
  arrow:{
    width:scaleSize(60),
    height:scaleSize(60)
  },
  line:{
    width:'100%',
    height:scaleSize(50),
    backgroundColor:'#f2f2f2'
  },
  main_list:{
    
  },
  list_item:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:scaleSize(50),
    paddingVertical:scaleSize(50),
    borderBottomWidth:scaleSize(2),
    borderStyle:'solid',
    borderBottomColor:'#f2f2f2'
  },
  head_pic:{
    width:scaleSize(150),
    height:scaleSize(150),
    borderRadius:scaleSize(75),
    marginRight:scaleSize(20)
  },
  info_box:{
    flex: 1,
    display:'flex',
    flexDirection:'column'
  },
  status_txt:{
    fontSize:scaleFont(40),
    color:'#999'
  },
  add_btn: {
    width:scaleSize(230),
    height:scaleSize(70),
    borderRadius:scaleSize(8),
    backgroundColor:'#e2e1e8',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  view_btn:{
    width:scaleSize(130),
    height:scaleSize(70),
    borderRadius:scaleSize(8),
    backgroundColor:'#e2e1e8',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  btn_txt:{
    color:'#897FDD',
    fontSize:scaleFont(40)
  },
  request_name:{
    fontSize:scaleFont(48),
    color:'#333',
    marginBottom:scaleSize(15)
  },
  request_info:{
    fontSize:scaleFont(40),
    color:'#999'
  },
  searchList:{
    marginTop:scaleSize(20)
  }
})