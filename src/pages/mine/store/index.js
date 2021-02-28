import React, { Component,Fragment } from 'react'
import { StyleSheet, View,Text,Image,TouchableOpacity,SafeAreaView } from 'react-native'
import Header from '../../../components/header/index'
import { scaleSize, scaleFont } from '../../../utils/scaleUtil'

const storeDone = require('../../../assets/mine/undone-icon.png')

export default class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:''
    }
  }
    handleGoPublish(){
        this.props.navigation.navigate('StoreList',{type:'publish'})
    }
    handleGoJoin(){
        this.props.navigation.navigate('StoreList',{type:'join'})
    }
    render (){
        return (
            <Fragment>
				<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <SafeAreaView style={styles.storeWrap}>
                {/* <View style={styles.storeCountWrap}>
                    <View style={styles.storeCountBox}>
                        <View style={styles.storeCountNum}>
                            <View style={styles.storeCountItem}>
                                <View style={styles.storeNumber}>
                                    <Text style={styles.storeMoney}>1,200.0</Text>
                                    <Text style={styles.storeYuan}>元</Text>
                                </View>
                                <Text style={styles.storeNumberTitle}>钱庄余额</Text>
                            </View>
                            <View style={styles.storeCountItem}>
                                <View style={styles.storeNumber}>
                                    <Text style={styles.storeMoney}>1,200.0</Text>
                                    <Text style={styles.storeYuan}>元</Text>
                                </View>
                                <Text style={styles.storeNumberTitle}>待入账</Text>
                            </View>
                        </View>
                        <View style={styles.storeCountBtnBox}>
                            <Text style={styles.storeCountBtnItem}>充值</Text>
                            <Text style={styles.storeCountBtnItem}>提现</Text>
                        </View>
                    </View>
                </View> */}
                <View style={styles.storeList}>
                    <TouchableOpacity 
                        style={styles.storeItem}
                        onPress={() => this.handleGoPublish()}>
                        <View style={styles.storeIconBg}>
                            <Image style={styles.storeIcon} source={storeDone}></Image>
                        </View>
                        <Text style={styles.storeText}>我发布的</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.storeItem}
                        onPress={() => this.handleGoJoin()}
                    >
                        <View style={styles.storeIconBg}>
                            <Image style={styles.storeIcon} source={storeDone}></Image>
                        </View>
                        <Text style={styles.storeText}>我参与的</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.storeTipsWrap}>
                    <Text style={styles.storeTipsTitle}>温馨提示：</Text>
                    <Text style={styles.storeTipsPoint}>1.我是活动参与者：</Text>
                    <Text style={styles.storeTipsDes}>若活动方原因导致活动未举行，可在两个工作日投诉，申请退款哦</Text>
                    <Text style={styles.storeTipsPoint}>1.我是活动发布者：</Text>
                    <Text style={styles.storeTipsDes}>发布的活动按时举行，则活动费用会在三个工作日内到账</Text>
                </View>
            </SafeAreaView>
            </Fragment>
        ) 
    }   
}
 const styles =  StyleSheet.create({
  storeWrap:{
      
  },
  storeCountWrap:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      
      marginTop:scaleSize(54)
  },
  storeCountBox:{
      width:scaleSize(970),
      borderRadius:scaleSize(20),
      backgroundColor:"#fff",
      paddingTop:scaleSize(54)
  },
  storeCountNum:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      borderBottomWidth:1,
      borderStyle:'solid',
      paddingBottom:scaleSize(60),
      borderColor:'#f2f2f2'
  },
  storeCountItem:{
      flex:1,
  },
  storeNumber:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      marginBottom:scaleSize(39),
  },
  storeMoney:{
      fontSize:scaleFont(60),
      color:'#333'
  },
  storeYuan:{
      fontSize:scaleFont(48),
      color:'#333',
      lineHeight:scaleFont(75)
  },
  storeNumberTitle:{
      textAlign:'center',
      fontSize:scaleFont(42),
      color:'#333',
  },
  storeCount:{
      height:scaleSize(453),
      width:scaleSize(972),
      borderRadius: scaleSize(26),
      borderWidth:1,
      borderColor:'#ccc',
  },
  storeTipsWrap:{
      padding:scaleSize(50)
  },
  storeTipsTitle:{
      color: '#333',
      fontSize:scaleFont(42),
      marginBottom:scaleSize(13)
  },
  storeTipsDes:{
      color: '#666',
      fontSize:scaleFont(39),
      lineHeight:scaleSize(54),
      marginBottom:scaleSize(22)
  },
  storeTipsPoint:{
      color: '#666',
      fontSize:scaleFont(39),
      lineHeight:scaleSize(54)
  },
  storeCountBtnBox:{
      display:'flex',
      flexDirection:'row',
      height:scaleSize(140),
      alignItems:'center'
  },
  storeCountBtnItem:{
      flex:1,
      textAlign:'center',
      color: '#7063E3',
      fontSize:scaleFont(42)
  },
  storeList:{
      height:scaleSize(330),
      marginLeft:scaleSize(60),
      marginRight:scaleSize(60),
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      backgroundColor:'#fff',
      alignItems:'center',
      borderRadius:scaleSize(20),
      marginTop:scaleSize(25),
  },
  storeIconBg:{
      width:scaleSize(150),
      height:scaleSize(150),
      backgroundColor:'#f1f1f1',
      borderRadius:scaleSize(75),
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
  },
  storeIcon:{
      width:scaleSize(90),
      height:scaleSize(90)
  },
  storeText:{
      textAlign:'center',
      fontSize: scaleFont(42),
      color:'#333',
      marginTop:scaleSize(12)
  }
})