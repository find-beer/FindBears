import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
const imageUrl = {
  like: require("../../../assets/home/like.png"),
  unlike: require("../../../assets/home/unlike.png"),
  comment: require("../../../assets/mine/comment.png"),
  share: require("../../../assets/mine/share-icon.png"),
  more: require("../../../assets/mine/more.png"),
};
import { Modal } from "@ant-design/react-native";
import { connect, bindActions, bindState } from './../../../redux'
import Toast from './../../../utils/toast'
import { get } from "lodash";
import { scaleSize, scaleFont } from "../../../utils/scaleUtil";
import { getDate } from "../../../utils/date";
import Button from "./../../../components/button";
const defaultAvatar = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1817066819,1530157012&fm=11&gp=0.jpg'
class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      loginUid: this.props.loginUid || "",
      isMinePage: this.props.isMinePage || false,
    };
  }
  componentDidMount() {
    console.log('this.props ----> ', this.props)
  }
  handleGoDetail() {
    this.props.navigation.navigate("DynamicDetail", { id: this.state.data.id });
  }
  handleGoStrangerPage() {
    const { userVO } = this.state.data
    if (userVO && userVO.userId) {
      this.props.navigation.navigate("StrangerInfo", { userId });
    }
  }
  handleLike = async () => {
		try {
			const payload = {
				infoId: this.state.data.id,
				infoType: 2,
				state: this.state.data.like ? 0 : 1,
			}
			const result = await this.props.post('like/operate', payload)
			if (this.state.data.like) {
				this.setState({
					data: {
						...this.state.data,
						like: false,
						likeNum: this.state.data.likeNum - 1,
					},
				});
			} else {
				this.setState({
					data: {
						...this.state.data,
						like: true,
						likeNum: this.state.data.likeNum + 1,
					},
				});
			}
		} catch(error) {
		}
  }
  handleDelete() {
    Modal.alert("提示", "确认删除该动态么", [{
        text: "取消",
        onPress: () => {},
        style: "cancel",
      },
      { text: "删除", onPress: () => this.delete() },
    ]);
  }
  delete = async () => {
		try {
			const result = await this.props.post('/feed/delete', { id: this.state.data.id })
			if (result.code === 0) {
        Toast.toast("删除成功");
      } else {
        Toast.toast("删除失败，请重试");
      }
		} catch(e) {
			Toast.toast("删除失败，请重试");
		}
  }
  render() {
    const data = this.state.data
		const { userVO = {} } = this.state.data
    const picList = userVO && userVO.picUrl ? userVO.picUrl.split(",") : [];
    const pic = defaultAvatar;
    return (
      <View style={styles.dynamicItemWrap}>
        <View style={styles.itemHeader}>
          <TouchableOpacity onPress={() => this.handleGoStrangerPage()}>
            <Image source={{ uri: pic.replace("https", "http") }} style={styles.avatarInner}/>
          </TouchableOpacity>
          <View style={styles.dynamicInfo}>
            <Text style={styles.name}>  </Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoTime}>{getDate(data.publishTime)}</Text>
            </View>
          </View>
          {
            // 个人中心页面，且动态id是本人id,才展示删除按钮
            this.state.isMinePage &&
            this.state.loginUid !== userVO.uid ? (
              <TouchableOpacity onPress={() => this.handleDelete()}>
                <Image source={imageUrl.more} style={styles.operateBtn} />
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View style={styles.dynamicTextBox}>
          <TouchableOpacity onPress={() => this.handleGoDetail()}>
            <Text style={styles.dynamicText}>{data.content}</Text>
          </TouchableOpacity>
          <View style={styles.imgBox}>
            {picList.map((item) => {
              return (
                <Image
                  source={{ uri: item.replace("https", "http") }}
                  style={styles.dynamicImg}
                  key={item}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.operationBox}>
          <Button
            style={styles.operationItem1}
            onPress={() => this.handleLike()}
          >
            <Image
              source={data.like ? imageUrl.like : imageUrl.unlike}
              style={styles.operationIcon}
            />
            <Text style={styles.operationText}>点赞{data.likeNum}</Text>
          </Button>
          <Button
            style={styles.operationItem2}
            onPress={() => this.handleGoDetail()}
          >
            <Image source={imageUrl.comment} style={styles.operationIcon} />
            <Text style={styles.operationText}>已评论{data.commentNum}</Text>
          </Button>
          <View style={styles.operationItem3}>
            <Image source={imageUrl.share} style={styles.operationIcon} />
            <Text style={styles.operationText}>分享</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default connect(bindState, bindActions)(FeedItem)
const styles = StyleSheet.create({
  operateBtn: {
    width: scaleSize(100),
    height: scaleSize(30),
    backgroundColor: "red",
  },
  dynamicItemWrap: {
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingHorizontal: 30,
    // borderBottomColor:'#F2F2F2',
    // borderBottomWidth:scaleSize(1),
    borderStyle: "solid",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  itemHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleSize(45),
    marginBottom: scaleSize(10),
  },
  dynamicInfo: {
    flex: 1,
  },
  avatarInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: scaleSize(40),
  },
  name: {
    color: "#564F5F",
    marginTop: scaleSize(20),
    marginBottom: scaleSize(20),
    fontSize: 18,
    fontWeight: "400",
  },
  infoBox: {
    display: "flex",
    flexDirection: "row",
    fontSize: scaleSize(36),
    color: "#999999",
    alignItems: "center",
  },
  line: {
    height: scaleSize(33),
    width: scaleSize(2),
    borderRadius: scaleSize(2),
    backgroundColor: "#999999",
    marginRight: scaleSize(20),
    marginLeft: scaleSize(10),
  },
  relationBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: scaleSize(222),
    height: scaleSize(92),
    justifyContent: "center",
  },
  relationText: {
    color: "#fff",
    fontSize: scaleFont(40),
  },
  imgBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dynamicTextBox: {},
  dynamicText: {
    fontSize: scaleSize(48),
    color: "#564F5F",
  },
  dynamicImg: {
    marginTop: scaleSize(32),
    height: scaleSize(380),
    width: scaleSize(280),
    borderRadius: scaleSize(15),
  },
  operationBox: {
    display: "flex",
    flexDirection: "row",
    marginBottom: scaleSize(50),
    marginTop: scaleSize(30),
  },
  operationItem1: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  operationItem2: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  operationItem3: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  operationIcon: {
    width: scaleSize(55),
    height: scaleSize(55),
    marginRight: scaleSize(20),
  },
  operationText: {
    fontSize: scaleSize(40),
    color: "#564F5F",
    textAlign: "center",
  },
  viewDetailBtn: {
    marginTop: scaleSize(40),
    marginBottom: scaleSize(40),
    backgroundColor: "#564f5f",
    textAlign: "center",
    lineHeight: scaleSize(120),
    height: scaleSize(120),
    borderRadius: scaleSize(60),
  },
  viewDetailBtnText: {
    color: "#fff",
    fontSize: scaleFont(40),
  },
  infoPosition: {
    fontSize: 12,
    color: "#999999",
  },
  infoTime: {
    fontSize: 12,
    color: "#999999",
  },
});
