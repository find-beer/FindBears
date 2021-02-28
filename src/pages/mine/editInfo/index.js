import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../../components/header/index";
import { scaleSize, scaleFont } from "../../../utils/scaleUtil";
const camera = require("../../../assets/mine/camera-icon.png");
const tbears = require("../../../assets/mine/tbears.png");
import ImagePicker from "react-native-image-picker";
import EventBus from "../../../utils/EventBus";
import {
  Button,
  Provider,
  List,
  TextareaItem,
  DatePicker,
} from "@ant-design/react-native";
import { GetRequest, PutRequest, PostRequest } from "../../../utils/request";
import { xor } from "lodash";
import { connect, bindActions, bindState }  from './../../../redux'
class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editForm: {
        ...this.props.route.params,
        loginToken: this.props.route.params.loginToken,
      },
      hobbyList: [],
    };
  }
  componentDidMount() {
    this.getHobbyList();
  }
  getHobbyList() {
    GetRequest("user/listHobbyTagName").then((res) => {
      res &&
        this.setState({
          hobbyList: res.data,
        });
    });
  }
  changeDate(val) {
    this.setState({
      editForm: {
        ...this.state.editForm,
        birthdayTimeStamp: new Date(val).getTime(),
      },
    });
  }
  activeItem(name) {
    // 取消选中
    if (this.state.editForm.hobbyTagNameList.includes(name)) {
      let arr = [...this.state.editForm.hobbyTagNameList];
      arr.splice(
        arr.findIndex((item) => item === name),
        1
      );
      this.setState({
        editForm: {
          ...this.state.editForm,
          hobbyTagNameList: arr,
        },
      });
      return;
    }
    // 最多3个
    if (this.state.editForm.hobbyTagNameList.length >= 5) {
      return;
    }
    // 选中
    this.setState({
      editForm: {
        ...this.state.editForm,
        hobbyTagNameList: [...this.state.editForm.hobbyTagNameList, name],
      },
    });
  }
  getClass(item) {
    return this.state.editForm.hobbyTagNameList.includes(item)
      ? styles.hobbyActiveItem
      : styles.hobbyItem;
  }
  getTextClass(name) {
    return this.state.editForm.hobbyTagNameList.includes(name)
      ? styles.hobbyActiveText
      : styles.hobbyText;
  }
  choosePicture() {
    this.setState({});
    const options = {
      title: "选择图片",
      cancelButtonTitle: "取消",
      takePhotoButtonTitle: "拍照",
      chooseFromLibraryButtonTitle: "图片库",
      cameraType: "back",
      mediaType: "photo",
      videoQuality: "high",
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
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let formData = new FormData();
        formData.append("imgFile", {
          uri:
            Platform.OS === "ios"
              ? "data:image/jpeg;base64," + response.data
              : response.uri,
          type: "multipart/form-data",
          name: "trend" + new Date().getTime() + ".jpg",
        });

        let currentHeader;
        if (Platform.OS === "ios") {
          currentHeader = {
            "Content-Type": "multipart/form-data;charset=utf-8",
          };
        } else {
          currentHeader = {
            Accept: "application/json",
          };
        }
        PostRequest("common/uploadImage", formData)
          .then((res) => {
            this.setState({
              editForm: {
                ...this.state.editForm,
                headPicUrl: res.data.url,
              },
            });
          })
          .catch((e) => {
          });
      }
    });
  }
  checkModify() {
    let that = this;
    return new Promise((resolve, reject) => {
      let oldObj = that.props.route.params;
      let newObj = that.state.editForm;
      if (
        oldObj.birthdayTimeStamp === newObj.birthdayTimeStamp &&
        oldObj.name === newObj.name &&
        oldObj.adName === newObj.adName &&
        xor(oldObj.hobbyTagNameList, newObj.hobbyTagNameList).length === 0
      ) {
        reject();
      } else {
        resolve();
      }
    });
  }
  modify() {
    let date = new Date(this.state.editForm.birthdayTimeStamp);
    this.checkModify().then(() => {});
    PutRequest("user/modifyUser", {
      ...this.state.editForm,
      birthday: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      loginToken: this.state.editForm.token,
      locationStr: `${this.state.editForm.province}-${this.state.editForm.cityName}-${this.state.editForm.adName}`,
    }).then((res) => {
      EventBus.post("REFRESHMINE");
      this.props.navigation.navigate("Mine");
    });
  }
  render() {
    const form = this.state.editForm;
    return (
      <Provider>
        <Fragment>
          <ScrollView>
            <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
            <List>
              <View style={styles.container}>
                <View style={styles.editInfoMain}>
                  <TouchableOpacity
                    style={styles.avatarItemWrap}
                    onPress={() => this.choosePicture()}
                  >
                    {this.state.editForm.headPicUrl && (
                      <Image
                        source={{
                          uri: this.state.editForm.headPicUrl.replace(
                            "https",
                            "http"
                          ),
                        }}
                        style={styles.avatarItem}
                      />
                    )}
                    <Image source={camera} style={styles.avatarCamera}></Image>
                    <Text style={styles.label}>编辑头像</Text>
                  </TouchableOpacity>
                  {/* <View style={styles.avatarCoverWrap}>
													<View style={styles.avatarCoverBtn}>
														<Text style={styles.avatarCover}>更换封面</Text>
													</View>
											</View> */}
                </View>
                <View style={styles.infoFormWrap}>
                  <View style={styles.infoFormItem}>
                    <Text style={styles.formItemTitle}>修改昵称</Text>
                    <TextInput
                      value={this.state.editForm.name}
                      onChangeText={(val) =>
                        this.setState({
                          editForm: {
                            ...this.state.editForm,
                            name: val,
                          },
                        })
                      }
                      style={styles.formItem}
                    />
                  </View>
                  <View style={styles.infoFormItem}>
                    <Text style={styles.formItemTitle}>常驻地</Text>
                    <Text
                      style={styles.formItem}
                    >{`${this.state.editForm.province}-${this.state.editForm.cityName}-${this.state.editForm.adName}`}</Text>
                  </View>

                  <View style={styles.dateItem}>
                    <DatePicker
                      value={new Date(this.state.editForm.birthdayTimeStamp)}
                      mode="date"
                      minDate={new Date(1970, 1, 1)}
                      maxDate={new Date(2020, 1, 1)}
                      onChange={(val) => this.changeDate(val)}
                      format="YYYY-MM-DD"
                    >
                      <List.Item>
                        <Text style={styles.dateLabel}>生日</Text>
                      </List.Item>
                    </DatePicker>
                  </View>
                  <View>
                    <TextareaItem
                      placeholder="描述一下自己吧..."
                      style={styles.introduction}
                      rows={4}
                      value={this.state.editForm.introduction}
                      onChange={(val) =>
                        this.setState({
                          editForm: {
                            ...this.state.editForm,
                            introduction: val,
                          },
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.chatWrap}>
                  <Image source={tbears} style={styles.tbears} />
                  <View style={styles.tbearsChat}>
                    <Text style={styles.tbearsChatText}>
                      你喜欢什么呢，可以选出来告诉小熊吗？这样方便好友找你组团活动哦
                    </Text>
                  </View>
                </View>
                <View style={styles.hobbyWrap}>
                  <View style={styles.hobbyList}>
                    {this.state.hobbyList.map((item) => {
                      return (
                        <TouchableOpacity
                          key={item}
                          style={this.getClass(item)}
                          onPress={() => this.activeItem(item)}
                        >
                          <Text style={this.getTextClass(item)}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <TouchableOpacity onPress={() => this.modify()}>
                    <View style={styles.modifyBtnBox}>
                      <Text style={styles.modifyBtnText}>修改</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </List>
          </ScrollView>
        </Fragment>
      </Provider>
    );
  }
}
export default connect(bindState, bindActions)(EditInfo)
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  editInfoMain: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#564F61",
    height: scaleSize(550),
  },
  avatarWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scaleSize(80),
    marginBottom: scaleSize(22),
  },
  avatarItemWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: scaleSize(266),
    height: scaleSize(266),
  },
  avatarItem: {
    width: scaleSize(266),
    height: scaleSize(266),
    borderRadius: scaleSize(133),
  },
  avatarCamera: {
    width: scaleSize(74),
    height: scaleSize(74),
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  label: {
    color: "#fff",
    marginTop: scaleSize(20),
  },
  avatarEdit: {
    fontSize: scaleFont(40),
    color: "#fff",
    textAlign: "center",
    marginBottom: scaleSize(22),
  },
  avatarCoverWrap: {
    position: "relative",
    overflow: "hidden",
    height: scaleSize(74),
  },
  avatarCoverBtn: {
    borderRadius: scaleSize(37),
    width: scaleSize(220),
    height: scaleSize(74),
    position: "absolute",
    right: scaleSize(52),
    backgroundColor: "#fff",
  },
  avatarCover: {
    color: "#333",
    fontSize: scaleFont(40),
    lineHeight: scaleSize(74),
    textAlign: "center",
  },
  infoFormWrap: {
    paddingLeft: scaleSize(54),
    paddingRight: scaleSize(54),
  },
  infoFormItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: scaleSize(160),
    borderBottomWidth: 1,
    borderColor: "#f2f2f2",
    borderStyle: "solid",
  },
  formItemTitle: {
    fontSize: scaleFont(42),
    color: "#564F5F",
  },
  arrow: {
    width: scaleSize(60),
    height: scaleSize(60),
  },
  chatWrap: {
    height: scaleSize(354),
    paddingLeft: scaleSize(54),
    paddingRight: scaleSize(54),
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  tbears: {
    width: scaleSize(60),
    height: scaleSize(60),
    marginRight: scaleSize(24),
  },
  tbearsChat: {
    width: scaleSize(900),
    height: scaleSize(200),
    backgroundColor: "#f1f0fa",
    borderRadius: scaleSize(10),
    padding: scaleSize(40),
  },
  tbearsChatText: {
    fontSize: scaleFont(42),
    color: "#564F5F",
    lineHeight: scaleSize(50),
  },
  hobbyWrap: {
    paddingLeft: scaleSize(54),
    paddingRight: scaleSize(54),
    height: scaleSize(960),
    display: "flex",
    flexDirection: "column",
  },
  hobbyList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    marginBottom: scaleSize(80),
  },
  hobbyItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: scaleSize(100),
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    borderRadius: scaleSize(50),
    marginRight: scaleSize(20),
    marginBottom: scaleSize(20),
    backgroundColor: "#dddddd",
  },
  hobbyActiveItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: scaleSize(100),
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50),
    borderRadius: scaleSize(50),
    marginRight: scaleSize(20),
    marginBottom: scaleSize(20),
    backgroundColor: "#8066E3",
  },
  hobbyText: {
    color: "#564F5F",
    fontSize: scaleFont(42),
  },
  hobbyActiveText: {
    fontSize: scaleFont(42),
    color: "#FFF",
  },
  hobbyAddBtn: {
    marginTop: scaleSize(100),
    marginBottom: scaleSize(92),
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  hobbyAddBtnText: {
    fontSize: scaleFont(42),
    color: "#999",
  },
  dateLabel: {
    fontSize: scaleFont(42),
    color: "#333",
    width: scaleSize(200),
    marginBottom: scaleSize(30),
  },
  dateItem: {
    marginLeft: scaleSize(-40),
    marginTop: scaleSize(20),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  modifyBtnBox: {
    width: "100%",
    height: scaleSize(120),
    borderRadius: scaleSize(40),
    backgroundColor: "#8A8DF9",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modifyBtnText: {
    color: "#fff",
    fontSize: scaleFont(40),
  },
});
