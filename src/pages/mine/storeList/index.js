import React, {Component} from 'react';
import { StyleSheet,View, Text, Image,ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
import Header from '../../../components/header/index';
import {Button,Provider,Modal} from '@ant-design/react-native';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';

const complainIcon = require('../../../assets/mine/complain-icon.png');
import {GetRequest,PostRequest} from '../../../utils/request';

export default class StoreList extends Component {
    constructor(props){
        super(props);
        this.state = {
            type:this.props.navigation.state.params.type || 'publish',
            activityList: [],
            pageInfo:{
                pageSize:500,
                pageNum:1
            }
        }
    }
    handleGoDetail(id){
        this.props.navigation.navigate('OrderList',{id})
    }
    handleGoActivityDetail(id){
        this.props.navigation.navigate('ActivityDetail', {id});
    }
    handleCancel(id){
      PostRequest('activity/stop',{id}).then((res) => {
            console.log(res)
            this.refreshPage()
        })
    }
    handleComplain(){
        Modal.alert('投诉', '请致电【15210586470】，说明【活动标题】和【发布人】及【原因】', [
            { text: '知道了', onPress: () => {}},
          ]);
    }
    refreshPage(){
        const url = this.state.type === 'join'?'order/user/orderlist':'activity/user'
        GetRequest(url,this.state.pageInfo).then(res => {
          console.log(res)
            this.setState({
                activityList:res.data || []
            })
        })
    }
    componentDidMount(){
        this.refreshPage()
    }
    render() {
        let list = this.state.activityList;
        const isJoin = this.state.type === 'join';
        return (
            <Provider>
                <SafeAreaView style={styles.storeListWrap}>
                <Header title={this.state.type === 'join'?'我参与的':'我发布的'} left={null} />
                <ScrollView style={styles.activityList}>
                    {list.map((item, index) => {
                        return (
                            <View style={styles.activityItem} key={index}>
                                <View style={styles.activityTitle}>
                                    <Text style={styles.titleText}>
                                        【活动标题】{isJoin?item.activityName:item.activityTitle}
                                    </Text>
                                    {
                                        this.state.type === 'join'
                                        ? 
                                        <TouchableOpacity 
                                            style={styles.complainBtn}
                                            onPress={() => this.handleComplain()}
                                        >
                                            <Image
                                                source={complainIcon}
                                                style={styles.complainIcon}
                                            />
                                            <Text style={styles.complainText}>
                                                投诉
                                            </Text>
                                        </TouchableOpacity>
                                        :<></>
                                    }
                                </View>
                                <TouchableOpacity onPress={() => this.handleGoActivityDetail()}>
                                    <Text style={styles.activityItemInner}>
                                        【活动时间】{new Date(item.activityTime).toLocaleString().split(' ')[0]}
                                    </Text>
                                    <Text style={styles.activityItemInner}>
                                        【活动地点】{isJoin?item.address:item.cityName}
                                    </Text>
                                    <Text style={styles.activityItemInner}>
                                        【活动费用】{isJoin?item.money:item.ticketVoList[0].price}元
                                    </Text>
                                    {/* <View style={styles.activityPhoto}>
                                        <Image style={styles.activityImage} />
                                        <Image style={styles.activityImage} />
                                        <Image style={styles.activityImage} />
                                    </View> */}
                                </TouchableOpacity>
                                {
                                    this.state.type === 'publish'
                                    ?
                                    <View style={styles.btnBox}>
                                        <TouchableOpacity 
                                            style={styles.operateBtn}
                                            onPress={() => this.handleCancel(item.id)}>
                                            <Text style={styles.operateBtnText}>
                                                停止报名
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.operateBtn}
                                            onPress={() => this.handleGoDetail(item.id)}
                                        >
                                            <Text style={styles.operateBtnText}>
                                                报名详情
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <Button 
                                        style={styles.viewOrderBtn} 
                                        onPress={() => this.handleGoDetail(item.id)}
                                    >
                                        <Text style={styles.viewOrderBtnText}>查看订单</Text>
                                    </Button>
                                }
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  storeListWrap: {
      borderStyle: 'solid',
      borderColor: '#ccc',
  },
  activityList:{
      marginBottom:scaleSize(300)
  },
  activityItem: {
      paddingTop: scaleSize(72),
      paddingBottom: scaleSize(72),
      marginBottom: scaleSize(24),
      paddingLeft: scaleSize(54),
      paddingRight: scaleSize(54),
      backgroundColor: '#fff',
  },
  activityTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: scaleSize(24),
  },
  titleText: {
      color: '#333',
      fontSize: scaleFont(48),
  },
  complainBtn: {
      width: scaleSize(167),
      height: scaleSize(62),
      borderStyle: 'solid',
      borderWidth: scaleSize(3),
      borderColor: '#564f5f',
      borderRadius: scaleSize(46),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  complainIcon: {
      width: scaleSize(34),
      height: scaleSize(34),
      marginRight: scaleSize(12),
  },
  complainText: {
      fontSize: scaleFont(33),
      color: '#333',
  },
  activityItemInner: {
      marginBottom: scaleSize(24),
      fontSize: scaleFont(42),
      color: '#666',
  },
  activityPhoto: {
      paddingTop: scaleSize(42),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  activityImage: {
      width: scaleSize(290),
      height: scaleSize(380),
      backgroundColor: 'red',
      borderRadius: scaleSize(10),
  },
  btnBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  operateBtn: {
      width: scaleSize(470),
      height: scaleSize(90),
      borderRadius: scaleSize(45),
      backgroundColor: '#564F5F',
      marginTop: scaleSize(54),
  },
  operateBtnText: {
      lineHeight: scaleSize(90),
      textAlign: 'center',
      fontSize: scaleFont(36),
      color: '#fff',
      fontWeight: 'bold',
  },
  viewOrderBtn:{
      textAlign:'center',
      height:scaleSize(120),
      lineHeight:scaleSize(120),
      borderRadius:scaleSize(60),
      backgroundColor: '#564F5F',
      marginTop: scaleSize(54),
  },
  viewOrderBtnText:{
      color:'#fff',
      fontSize:scaleFont(40)
  }
});
