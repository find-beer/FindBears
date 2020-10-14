import React, { Component } from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import Header from '../../components/header/index'
import { scaleSize, scaleFont } from '../../utils/scaleUtil'

const avatar = require('../../assets/mine/avatar.jpeg')
const camera = require('../../assets/mine/camera-icon.png')
const arrow = require('../../assets/mine/arrow_right.png')
const tbears = require('../../assets/mine/tbears.png')

export default class EditInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:''
    }
  }
    render (){
        return (
            <View style={styles.editInfoWrap}>
                <Header title="编辑资料" left={null} />
                <View style={styles.editInfoMain}>
                    <View style={styles.avatarWrap}>
                        <View style={styles.avatarItemWrap}>
                            <Image source={avatar} style={styles.avatarItem}></Image>
                            <Image source={camera} style={styles.avatarCamera}></Image>
                        </View>
                    </View>
                    <Text style={styles.avatarEdit}>编辑头像</Text>
                    <View style={styles.avatarCoverWrap}>
                        <View style={styles.avatarCoverBtn}>
                            <Text style={styles.avatarCover}>更换封面</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoFormWrap}>
                    <View style={styles.infoFormItem}>
                        <Text style={styles.formItemTitle}>修改昵称</Text>
                    </View>
                    <View style={styles.infoFormItem}>
                        <Text style={styles.formItemTitle}>常驻地</Text>
                    </View>
                    <View style={styles.infoFormItem}>
                        <Text style={styles.formItemTitle}>生日</Text>
                        <Image source={arrow} style={styles.arrow}/>
                    </View>
                </View>
                <View style={styles.chatWrap}>
                    <Image source={tbears} style={styles.tbears}/>
                    <View style={styles.tbearsChat}>
                        <Text style={styles.tbearsChatText}>你喜欢什么呢，可以选出来告诉小熊吗？这样方便好友找你组团活动哦</Text>
                    </View>
                </View>
                <View style={styles.hobbyWrap}>
                    <View style={styles.hobbyList}>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                        <Text style={styles.hobbyItem}>+健身</Text>
                    </View>
                    <View style={styles.hobbyAddBtn}>
                        <Text  style={styles.hobbyAddBtnText}>手动添加更多</Text>
                        <Image source={arrow} style={styles.arrow}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  editInfoWrap:{
      backgroundColor:'#fff'
  },
  editInfoMain:{
      backgroundColor:'#564F61',
      height:scaleSize(550),
  },
  avatarWrap:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      marginTop:scaleSize(80),
      marginBottom:scaleSize(22)
  },
  avatarItemWrap:{
      position:'relative',
      width:scaleSize(266),
      height:scaleSize(266)
  },
  avatarItem:{
      width:scaleSize(266),
      height:scaleSize(266),
      borderRadius:scaleSize(133)
  },
  avatarCamera:{
      width:scaleSize(74),
      height:scaleSize(74),
      position:'absolute',
      right:0,
      bottom:0
  },
  avatarEdit:{
      fontSize:scaleFont(40),
      color:'#fff',
      textAlign:'center',
      marginBottom:scaleSize(22)
  },
  avatarCoverWrap:{
      position:'relative',
      overflow:'hidden',
      height:scaleSize(74)
  },
  avatarCoverBtn:{
      borderRadius: scaleSize(37),
      width:scaleSize(220),
      height:scaleSize(74),
      position:'absolute',
      right:scaleSize(52),
      backgroundColor:'#fff'
  },
  avatarCover:{
      color:'#333',
      fontSize:scaleFont(40),
      lineHeight:scaleSize(74),
      textAlign:'center'
  },
  infoFormWrap:{
      paddingLeft:scaleSize(54),
      paddingRight:scaleSize(54)
  },
  infoFormItem:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:scaleSize(160),
      borderBottomWidth:1,
      borderColor:'#f2f2f2',
      borderStyle:'solid'
  },
  formItemTitle:{
      fontSize:scaleFont(42),
      color:'#564F5F',
  },
  arrow:{
      width:scaleSize(60),
      height:scaleSize(60)
  },
  chatWrap:{
      height:scaleSize(354),
      paddingLeft:scaleSize(54),
      paddingRight:scaleSize(54),
      display:'flex',
      alignItems:'center',
      flexDirection:'row'
  },
  tbears:{
      width:scaleSize(60),
      height:scaleSize(60),
      marginRight:scaleSize(24)
  },
  tbearsChat:{
      width:scaleSize(900),
      height:scaleSize(200),
      backgroundColor:'#f1f0fa',
      borderRadius:scaleSize(10),
      padding:scaleSize(40)
  },
  tbearsChatText:{
      fontSize:scaleFont(42),
      color:'#564F5F',
      lineHeight:scaleSize(50)
  },
  hobbyWrap:{
      paddingLeft:scaleSize(54),
      paddingRight:scaleSize(54),
      height:scaleSize(960),
      display:'flex',
      flexDirection:'column'
  },
  hobbyList:{
      position:'relative'  
  },
  hobbyItem:{
      fontSize:scaleSize(42),
      color:'#564F5F'
  },
  hobbyAddBtn:{
      marginTop:scaleSize(100),
      marginBottom:scaleSize(92),
      textAlign:'center',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
  },
  hobbyAddBtnText:{
      fontSize:scaleFont(42),
      color:'#999'
  }
})