import React, { Component,Fragment } from 'react'
import { SafeAreaView,StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native'
const arrow = require('../../../assets/mine/arrow_right.png')
import {Switch} from '@ant-design/react-native';
import { removeStorage } from '../../../utils/storage'
import { scaleSize, scaleFont } from '../../../utils/scaleUtil'
import { connect, bindActions, bindState }  from '../../../redux'

class Setting extends Component {
    state = {
        text:'',
        openNotice:false,
        openSound:false,
        openWeng:false
    }
    onSwitchNotice(value){
        this.setState({
            openNotice:value
        })
    }
    onSwitchSound(value){
        this.setState({
            openSound:value
        })
    }
    onSwitchWeng(value){
        this.setState({
            openWeng:value
        })
    }
    handleClearCache(){

    }

    logout = async () => {
        await removeStorage('userInfo')
        this.props.setUserInfo({})
        this.props.navigation.navigate('Home')
    }

    render (){
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <SafeAreaView style={styles.configWrap}>
                    <View style={styles.configInner}>
                        {/* <View style={styles.configItem}>
                            <Text style={styles.configItemText}>探熊介绍及反馈</Text>
                            <Image source={arrow} style={styles.configItemArrow}/>
                        </View> */}
                        {/* <View style={styles.configItem}>
                            <Text style={styles.configItemText}>账号安全(手机号/密码/找回账号)</Text>
                            <Image source={arrow} style={styles.configItemArrow} />
                        </View> */}
                        {/* <View style={styles.configItem}>
                            <Text style={styles.configItemText}>隐私保护</Text>
                            <Image source={arrow} style={styles.configItemArrow} />
                        </View> */}
                        <TouchableOpacity 
                            style={styles.configItem}
                            onPress={() => this.handleClearCache()}
                        >
                            <Text style={styles.configItemText}>清理缓存</Text>
                            <Image source={arrow} style={styles.configItemArrow} />
                        </TouchableOpacity>
                        <Text style={styles.text}>
                            未打开探熊时
                        </Text>
                        <TouchableOpacity 
                            style={styles.configItem}
                        >
                            <Text style={styles.configItemText}>接受通知提醒</Text>
                            <Switch
                                checked={this.state.openNotice}
                                onChange={(val) => this.onSwitchNotice(val)}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text}>
                            未打开探熊时
                        </Text>
                        <TouchableOpacity 
                            style={styles.configItem}
                        >
                            <Text style={styles.configItemText}>声音</Text>
                            <Switch
                                checked={this.state.openSound}
                                onChange={(val) => this.onSwitchSound(val)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.configItem}
                        >
                            <Text style={styles.configItemText}>震动</Text>
                            <Switch
                                checked={this.state.openWeng}
                                onChange={(val) => this.onSwitchWeng(val)}
                            />
                        </TouchableOpacity>
                        <View style={styles.configItem}>
                            <Text style={styles.configItemText}>版本号</Text>
                            <Text style={styles.configItemDes}>V1.0.0</Text>
                        </View>
                        <TouchableOpacity onPress={this.logout}>
                            <Text style={styles.logoutBtn}>退出登录</Text>
                        </TouchableOpacity>
                        
                    </View>
                </SafeAreaView>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    configWrap:{
        height:'100%'
    },
    configInner:{
        borderTopWidth: 1,
        borderColor: '#ccc',
        height:'100%'
    },
    configItem:{
        height:scaleSize(170),
        paddingLeft:scaleSize(54),
        paddingRight:scaleSize(54),
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems:'center'
    },
    configItemText:{
        fontSize:scaleFont(42),
        color:'#333',
        lineHeight:scaleSize(170)
    },
    configItemDes:{
        fontSize:scaleFont(39),
        color:'#999',
        lineHeight:scaleSize(170)
    },
    configItemArrow:{
        width:scaleSize(80),
        height:scaleSize(80),
    },
    logoutBtn:{
        fontSize:scaleFont(42),
        textAlign:'center',
        color:'rgba(194,61,77,0.82)',
        paddingTop:scaleSize(54)
    },
    text:{
        paddingLeft:scaleSize(54),
        paddingRight:scaleSize(54),
        color:'#888',
        fontSize:scaleFont(32),
        height:scaleSize(130),
        lineHeight:scaleSize(130),
    }
})


export default connect(bindState, bindActions)(Setting)