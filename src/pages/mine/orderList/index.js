import React, { Component,Fragment } from 'react'
import { StyleSheet, View, Text, Image,SafeAreaView} from 'react-native'
import Header from '../../../components/header/index'
import { scaleSize, scaleFont } from '../../../utils/scaleUtil'
import {Button} from '@ant-design/react-native';
const defaultImg = require('../../../assets/mine/avatar.jpeg');
import {GetRequest} from '../../../utils/request'
import AsyncStorage from "@react-native-community/async-storage";

export default class OrderList extends Component {
  constructor(props){
    super(props)
    this.state = {
      isPublish:true,
      personNum:100,
      money:2000,
      orderList:[],
      fields:[
        {
          key:'userName',
          label:'姓名'
        },{
          key:'phoneNum',
          label:'手机号'
        },{
          key:'cardNo',
          label:'身份证号'
        },{
          key:'activityTime',
          label:'活动时间'
        },{
          key:'ticketName',
          label:'所购票种'
        }
      ],
      userType:0
    }
  }
  backPay(item){
  }
  componentDidMount(){
    GetRequest('/order/biz/orderlist',{
      activityId:this.props.route.params.id,
      pageNum:1,
      pageSize:500
    }).then(res => {
      this.setState({
        orderList:res.data
      })
    })
  }
  render(){
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
        <SafeAreaView style={styles.orderListWrap}>
        <Header {...this.props} title="报名详情" left={null} />
          <View style={styles.container}>
            {/* {
              this.state.isPublish
              ?
              <View style={styles.totalInfo}>
                <View style={styles.peopleNumber}>
                  <Text style={styles.numTxt}>
                    报名人数:{this.state.personNum}
                  </Text>
                </View>
                <View style={styles.totalMoney}>
                  <Text style={styles.moneyTxt}>
                    金额总计:{this.state.money}元
                  </Text>
                </View>
              </View>
              :''
            } */}
            {
              this.state.orderList.map(item => {
                return (
                  <View style={styles.listItemBox} key={item.id}>
                    <View style={styles.infoBox}>
                      <View style={styles.avaterBox}>
                        <Image source={item.avater?{uri:item.avater}:defaultImg} style={styles.avater}/>
                      </View>
                      <View style={styles.textBox}>
                        {
                          this.state.fields.map(field => {
                            return (
                              <View style={styles.infoItem} key={field.key}>
                                <Text style={styles.label}>{field.label}：</Text>
                                <Text style={styles.value}>{item[field.key]}</Text>
                              </View>
                            )
                          })
                        }
                      </View>
                    </View>
                    <View style={styles.operateBox}>
                      <Text style={styles.payText}>
                        已支付：
                        <Text style={styles.payNum}>{item.payMoney}元</Text>
                      </Text>
                      <Button style={styles.backPay} onPress={() => this.backPay(item)}>
                        <Text style={styles.backPayText}>退款</Text>
                      </Button>
                    </View>
                  </View>
                )
              })
            }
          </View>
      </SafeAreaView>
      </Fragment>     
    )
  }
}

const styles = StyleSheet.create({
  orderListWrap:{
    paddingVertical:scaleSize(40)
  },
  container:{
    paddingHorizontal:scaleSize(54),
  },
  totalInfo:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:scaleSize(40),
    marginTop:scaleSize(20)
  },
  peopleNumber:{
    width:scaleSize(380),
    height:scaleSize(80),
    borderRadius:scaleSize(24),
    backgroundColor:'#fff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  totalMoney:{
    width:scaleSize(380),
    height:scaleSize(80),
    borderRadius:scaleSize(24),
    backgroundColor:'#564F5F',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  numTxt:{
    fontSize:scaleFont(36),
    color:'#333'
  },
  moneyTxt:{
    fontSize:scaleFont(36),
    color:'#fff'
  },
  listItemBox:{
    borderRadius:scaleSize(30),
    width:'100%',
    paddingHorizontal:scaleSize(80),
    paddingVertical:scaleSize(45),
    backgroundColor:'#fff',
    marginBottom:scaleSize(40),
    marginTop:scaleSize(40)
  },
  infoBox:{
    display:'flex',
    flexDirection:'row',
  },
  avaterBox:{
    width:scaleSize(200),
    marginTop:scaleSize(15)
  },
  avater:{
    width:scaleSize(133),
    height:scaleSize(133),
    borderRadius:scaleSize(66)
  },
  textBox:{
    flex: 1,
    marginBottom:scaleSize(45)
  },
  infoItem:{
    display:'flex',
    flexDirection:'row',
    marginBottom:scaleSize(20),
    alignItems:'center'
  },
  label:{
    fontSize:scaleFont(39),
    color:'#333'
  },
  value:{
    fontSize:scaleFont(36),
    color:'#5f5f5f'
  },
  operateBox:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  payText:{
    fontSize:scaleFont(39),
    color:'#333'
  },
  payNum:{
    fontSize:scaleFont(39),
    color:'#AA9BF7'
  },
  backPay:{
    width:scaleSize(220),
    height:scaleSize(70),
    borderRadius:scaleSize(35),
    backgroundColor:'#564F5f',
  },
  backPayText:{
    fontSize:scaleFont(42),
    color:'#fff'
  }
})