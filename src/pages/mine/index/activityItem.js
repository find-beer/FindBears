import React, {Component} from 'react';
import {StyleSheet,View, Text, Image,TouchableOpacity} from 'react-native';
import {Button} from '@ant-design/react-native';
import Card from './card.js';
const defaultImg = require('../../../assets/mine/avatar.jpeg');
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';
const imageUrl = {
		like: require('../../../assets/home/like.png'),
		unlike: require('../../../assets/home/unlike.png'),
    join: require('../../../assets/mine/join.png'),
    share: require('../../../assets/mine/share-icon.png'),
}
import {get} from 'lodash'
import {PostRequest} from "../../../utils/request";
import {getDayTime} from '../../../utils/date'

export default class ActivityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item:{...this.props.item}
        }
		}
		componentDidMount(){
		}
    handleViewDetail(){
      this.props.navigation.navigate('ActivityDetail',{id:this.state.item.id})
		}
		handleLike(){
			PostRequest('like/operate', {
				infoId: this.state.item.id,
				infoType: 2,
				state: this.state.item.like ? 0 : 1,
			}).then(() => {
				if (this.state.item.like) {
					this.setState({
						item: {
							...this.state.item,
							like: false,
							likeNum: this.state.item.likeNum - 1
						}
					})
				} else {
					this.setState({
						item: {
							...this.state.item,
							like: true,
							likeNum: this.state.item.likeNum + 1
						}
					})
				}
			})
		}
    render() {
				const item = this.state.item;
        const cardConfig = [
            {
                title: '活动主题',
                content: item.activityTitle,
            },
            {
                title: '活动时间',
                content: getDayTime(item.activityTime),
            },
            {
                title: '活动地点',
                content: item.activityAddress,
            },
            {
                title: '活动人数',
                content: item.memberCount,
            },
        ];
        const picList = (item.picUrl && item.picUrl.split(',')) || []
        return (
            <View style={styles.dynamicItemWrap}>
                <View style={styles.itemHeader}>
                    <Image
                        source={{uri:get(item.userVO,'pic','')?.replace('https','http')}}
                        style={styles.avatarInner}
                    />
                    <View style={styles.dynamicInfo}>
                        <Text style={styles.name}>
                            {get(item.userVO,'userName','探熊')}
                        </Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoPosition}>
                                {item.cityName || '北京'}
                            </Text>
                            <View style={styles.line} />
                            <Text style={styles.infoTime}>
                                {getDayTime(item.activityTime)}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.handleViewDetail()}>
                    <Card data={cardConfig}/>
                </TouchableOpacity>
                <View style={styles.imgBox}>
                    {
                        picList.map(item => {
                            return (
                                <Image
																		source={{uri:item}}
																		key={item}
                                    style={styles.dynamicImg}
                                />
                            )
                        })
                    }

                </View>
                <Button
                    style={styles.viewDetailBtn}
                    onPress={() => this.handleViewDetail()}>
                    <Text style={styles.viewDetailBtnText}>查看活动详情</Text>
                </Button>
                <View style={styles.operationBox}>
										<TouchableOpacity
											style={styles.oerationItem}
											onPress={() => this.handleLike()}>
                        <Image
                            source={item.like ? imageUrl.like : imageUrl.unlike}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>点赞{item.likeNum || 0}</Text>
                    </TouchableOpacity>
                    <View style={styles.oerationItem}>
                        <Image
                            source={imageUrl.join}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>已加入{item.ticketVoList?.assembleMemberCount || 0}人</Text>
                    </View>
                    <View style={styles.oerationItem}>
                        <Image
                            source={imageUrl.share}
                            style={styles.operationIcon}
                        />
                        <Text style={styles.operationText}>分享</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	dynamicItemWrap: {
			backgroundColor: '#fff',
			overflow: 'hidden',
			paddingLeft: scaleSize(40),
			paddingRight: scaleSize(40),
			borderBottomColor:'#F2F2F2',
			borderBottomWidth:scaleSize(1),
			borderStyle:'solid'
	},
	itemHeader: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: scaleSize(45),
			marginBottom: scaleSize(35),
	},
	dynamicInfo: {
			flex: 1,
	},
	avatarInner: {
			width: scaleSize(132),
			height: scaleSize(132),
			marginRight: scaleSize(40),
			borderRadius:scaleSize(66)
	},
	name: {
			fontSize: scaleFont(42),
			color: '#564F5F',
			fontWeight: 'bold',
			marginTop: scaleSize(20),
			marginBottom: scaleSize(20),
	},
	infoBox: {
			display: 'flex',
			flexDirection: 'row',
			fontSize: scaleSize(36),
			color: '#999999',
			alignItems: 'center',
	},
	line: {
			height: scaleSize(33),
			width: scaleSize(2),
			borderRadius: scaleSize(2),
			backgroundColor: '#999999',
			marginRight: scaleSize(20),
			marginLeft: scaleSize(10),
	},
	relationBtn: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			width: scaleSize(222),
			height: scaleSize(92),
			justifyContent: 'center',
	},
	relationText: {
			color: '#fff',
			fontSize: scaleFont(40),
	},
	imgBox:{
			display:'flex',
			flexDirection:'row',
			justifyContent:'space-between',
			paddingLeft:scaleSize(30),
			paddingRight:scaleSize(30)
	},
	dynamicTextBox: {},
	dynamicText: {
			fontSize: scaleSize(48),
			color: '#564F5F',
	},
	dynamicImg: {
			marginTop: scaleSize(32),
			height: scaleSize(380),
			width:scaleSize(280),
			borderRadius:scaleSize(15)
	},
	operationBox: {
			display: 'flex',
			flexDirection: 'row',
			marginBottom: scaleSize(50),
			marginTop: scaleSize(30),
	},
	oerationItem: {
			display: 'flex',
			flexDirection: 'row',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
	},
	operationIcon: {
			width: scaleSize(55),
			height: scaleSize(55),
			marginRight: scaleSize(20),
	},
	operationText: {
			fontSize: scaleSize(40),
			color: '#564F5F',
			textAlign: 'center',
	},
	viewDetailBtn:{
			marginTop:scaleSize(40),
			marginBottom:scaleSize(40),
			backgroundColor:'#564f5f',
			textAlign:'center',
			height:scaleSize(120),
			borderRadius:scaleSize(60)
	},
	viewDetailBtnText:{
			color:'#fff',
			fontSize:scaleFont(40)
	}
});
