import React, {Component,Fragment} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Toast } from '@ant-design/react-native';
import { PostRequest,GetRequest } from '../../../utils/request';
import { scaleSize, scaleFont } from '../../../utils/scaleUtil';
export default class Hobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hobbyList: [],
            checkedHobby: [],
            registerForm: this.props.route.params,
        };
    }
    componentDidMount() {
        this.getHobbyList();
    }
    getHobbyList() {
      GetRequest('user/listHobbyTagName').then(res => {
            res &&
                this.setState({
                    hobbyList: res.data,
                });
        });
    }
    activeItem(index) {
        // 取消选中
        if (this.state.checkedHobby.includes(index)) {
            let arr = [...this.state.checkedHobby];
            arr.splice(arr.findIndex(item => item === index), 1);
            this.setState({
                checkedHobby: arr,
            });
            return;
        }
        // 最多3个
        if (this.state.checkedHobby.length >= 5) {
            return;
        }
        // 选中
        this.setState({
            checkedHobby: [...this.state.checkedHobby, index],
        });
    }
    add0(m) {
        return m < 10 ? '0' + m : m;
    }
    format(times) {
        //shijianchuo是整数，否则要parseInt转换
        let time = new Date(times);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        return `${y}-${this.add0(m)}-${this.add0(d)}`;
    }
    async register() {
        try {
            if (this.state.checkedHobby.length < 1) {
                Toast.show('兴趣爱好至少选择一个~');
            }
            let checked = [];
            for (let i = 0; i < this.state.checkedHobby.length; i++) {
                checked.push(this.state.hobbyList[i]);
            }
            let params = {
                ...this.state.registerForm,
                hobbyTagNameList: checked,
            };
            delete params.birthdayTimeStamp;
            const res = await PostRequest('user/signUp', params)
            const { success } = res
            if (success) {
                AsyncStorage.setItem('session', res.data.token,() => {
                    this.props.navigation.navigate('TabContainer')
                });
                AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
            } else {
            }
        } catch(e) {
            Toast.loading('注册失败，请重试')
        }
    }
    getClass(index) {
        return this.state.checkedHobby.includes(index)
            ? styles.hobbyActiveItem
            : styles.hobbyItem;
    }
    getTextClass(index) {
        return this.state.checkedHobby.includes(index)
            ? styles.hobbyActiveText
            : styles.hobbyText;
    }
    render() {
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <SafeAreaView>
                <View style={styles.bgWrapper}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>点选你喜欢的</Text>
                    </View>
                    <View style={styles.hobbyBox}>
                        {this.state.hobbyList.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => this.activeItem(index)}>
                                    <View style={this.getClass(index)}>
                                        <Text style={this.getTextClass(index)}>
                                            {item}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View style={styles.startBoxWrapper}>
                        <TouchableOpacity
                            onPress={() => this.register()}>
                            <View style={styles.startBox}>
                                <Text style={styles.startTbearsBtn}>
                                    开启探熊APP
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
  bgWrapper: {
      backgroundColor: '#fff',
      height: '100%',
  },
  header: {
      marginTop: scaleSize(240),
      marginBottom: scaleSize(150),
  },
  headerText: {
      fontSize: scaleFont(48),
      color: '#999999',
      textAlign: 'center',
  },
  hobbyBox: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingLeft: scaleSize(50),
      paddingRight: scaleSize(50),
      marginBottom: scaleSize(80),
  },
  hobbyItem: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height: scaleSize(100),
      paddingLeft: scaleSize(50),
      paddingRight: scaleSize(50),
      borderRadius: scaleSize(50),
      marginRight: scaleSize(20),
      marginBottom: scaleSize(20),
      backgroundColor: '#dddddd',
  },
  hobbyActiveItem: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      height: scaleSize(100),
      paddingLeft: scaleSize(50),
      paddingRight: scaleSize(50),
      borderRadius: scaleSize(50),
      marginRight: scaleSize(20),
      marginBottom: scaleSize(20),
      backgroundColor: '#8066E3',
  },
  hobbyText: {
      color: '#564F5F',
      fontSize: scaleFont(42),
  },
  hobbyActiveText: {
      fontSize: scaleFont(42),
      color: '#FFF',
  },
  handleAddBox: {
      marginTop: scaleSize(90),
      marginBottom: scaleSize(200),
  },
  handleAdd: {
      fontSize: scaleFont(42),
      color: '#999999',
      textAlign: 'center',
  },
  startBoxWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      marginTop: scaleSize(80),
  },
  startBox: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width: scaleSize(560),
      height: scaleSize(160),
      borderRadius: scaleSize(80),
      borderWidth: scaleSize(1),
      borderColor: '#333333',
      backgroundColor: '#ffffff',
  },
  startTbearsBtn: {
      fontWeight:'bold',
      fontSize: scaleFont(52),
      color: '#333333',
      textAlign: 'center',
  },
});
