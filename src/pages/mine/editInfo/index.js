import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, TextInput,TouchableOpacity} from 'react-native'
import Header from '../../../components/header/index'
import { scaleSize, scaleFont } from '../../../utils/scaleUtil'

const avatar = require('../../../assets/mine/avatar.jpeg')
const camera = require('../../../assets/mine/camera-icon.png')
const tbears = require('../../../assets/mine/tbears.png')
import ImagePicker from 'react-native-image-picker';
import {
    Provider,
    List,
    DatePicker,
} from '@ant-design/react-native';
import {GetRequest} from '../../../utils/request';
const defaultImg = require('../../../assets/mine/avatar.jpeg');
const options = {
	title: '选择图片',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '图片库',
	cameraType: 'back',
	mediaType: 'photo',
	videoQuality: 'high',
	durationLimit: 10,
	maxWidth: 600,
	maxHeight: 600,
	aspectX: 2,
	aspectY: 1,
	quality: 0.8,
	angle: 0,
	allowsEditing: false,
	noData: false,
	storageOptions: {
			skipBackup: true,
			path: 'images',
	},
};

export default class EditInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            editForm:{
                headPicUrl: '',
                name:'',
                birthday:undefined,
						},
						checkedHobby:[],
						hobbyList: [],
        }
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
    changeDate(val) {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                birthday: val,
            },
        });
    }
    activeItem(index) {
        // 取消选中
        if (this.state.checkedHobby.includes(index)) {
            let arr = [...this.state.checkedHobby];
            arr.splice(arr.findIndex(item => item === index), 1);
            this.setState({
							checkedHobby: arr
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
		choosePicture() {
			this.setState({});
			ImagePicker.showImagePicker(options, response => {
					if (response.didCancel) {
							console.log('User cancelled image picker');
					} else if (response.error) {
							console.log('ImagePicker Error: ', response.error);
					} else if (response.customButton) {
							console.log('User tapped custom button: ');
					} else {
							const source = {uri: 'data:image/jpeg;base64,' + response.data};
							this.uploadImage({
									uri: response.uri,
									type: 'multipart/form-data',
									name: 'headPic.jpg',
							});
							this.setState({
									headPicUrl: source,
							});
					}
			});
	}
	uploadImage(file) {
			let formData = new FormData();
			formData.append('imgFile', file);
			fetch('http://121.89.223.103:8080/common/uploadImage', {
					method: 'POST',
					headers: {
							'Content-Type': 'multipart/form-data;charset=utf-8',
					},
					body: formData,
			})
					.then(response => {
							return response.json();
					})
					.then(res => {
							this.setState({
									registerForm: {
											...this.state.registerForm,
											headPicUrl: res.data.url,
									},
							});
					});
	}
    render (){
        return (
            <Provider>
                <SafeAreaView style={styles.editInfoWrap}>
                    <Header title="编辑资料" left={null} />
                    <List>
                        <View style={styles.container}>
                            <View style={styles.editInfoMain}>
															<TouchableOpacity
																style={styles.avatarItemWrap}
																onPress={() => this.choosePicture()}>
																<Image
																		source={this.state.headPicUrl || defaultImg}
																		style={styles.avatarItem}
																/>
																<Image source={camera} style={styles.avatarCamera}></Image>
																<Text style={styles.label}>编辑头像</Text>
															</TouchableOpacity>
															<View style={styles.avatarCoverWrap}>
																	<View style={styles.avatarCoverBtn}>
																			<Text style={styles.avatarCover}>更换封面</Text>
																	</View>
															</View>
                            </View>
                            <View style={styles.infoFormWrap}>
                                <View style={styles.infoFormItem}>
                                    <Text style={styles.formItemTitle}>修改昵称</Text>
                                    <TextInput
                                        value={this.state.editForm.name}
                                        onChangeText={val =>
                                            this.setState({
                                                registerForm: {
                                                    ...this.state.registerForm,
                                                    name: val,
                                                },
                                            })
                                        }
                                        style={styles.formItem}
                                    />
                                </View>
                                <View style={styles.infoFormItem}>
                                    <Text style={styles.formItemTitle}>常驻地</Text>
                                </View>
                                <View style={styles.dateItem}>
                                    <DatePicker
                                        value={this.state.editForm.birthday}
                                        mode="date"
                                        minDate={new Date(1970, 1, 1)}
                                        maxDate={new Date(2020, 1, 1)}
                                        onChange={val => this.changeDate(val)}
                                        format="YYYY-MM-DD">
                                        <List.Item>
                                            <Text style={styles.dateLabel}>
                                                生日
                                            </Text>
                                        </List.Item>
                                    </DatePicker>
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
															{
																this.state.hobbyList.map((item, index) => {
																		return (
																				<TouchableOpacity
																						key={item}
																						style={this.getClass(index)}
																						onPress={() => this.activeItem(index)}>
																						<Text style={this.getTextClass(index)}>
																								{item}
																						</Text>
																				</TouchableOpacity>
																		);
																})
															}
                            </View>
                        </View>
                        </View>
                    </List>
                </SafeAreaView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
container:{
      backgroundColor:'#fff'
  },
  editInfoMain:{
		display:'flex',
		alignItems:'center',
      flexDirection:'column',
      justifyContent:'center',
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
		display:'flex',
		flexDirection:'column',
		alignItems:'center',
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
	label:{
		color:'#fff',
		marginTop:scaleSize(20)
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
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingLeft: scaleSize(50),
		paddingRight: scaleSize(50),
		marginBottom: scaleSize(80),
  },
  hobbyItem: {
		display: 'flex',
		flexDirection: 'row',
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
	display: 'flex',
		flexDirection: 'row',
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
  },
  dateLabel:{
    fontSize: scaleFont(42),
    color: '#333',
    width: scaleSize(200),
    marginBottom: scaleSize(30),
  },
  dateItem:{
    marginLeft: scaleSize(-40),
    marginTop: scaleSize(20),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  }
})