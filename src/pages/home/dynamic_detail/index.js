/**
 *  动态详情
 */

import React,{Fragment} from 'react';
import {StyleSheet, Image, View, Text,SafeAreaView,TouchableOpacity,TextInput} from 'react-native';
import {scaleSize, scaleFont} from '../../../utils/scaleUtil';
import Header from '../../../components/header/index';
import User from './user';
import Photo from './photo';
import Action from './action';
import Comment from './comment';
import {GetRequest,PostRequest} from "../../../utils/request";
const defaultImage = require('../../../assets/mine/avatar.jpeg')


export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
						placeholder:'请发表评论',
            id:this.props.navigation.state.params.id ,
						detail: {},
						commentList:[],
						currentComment:{},
						comment:''
        };
    }

    getDetail() {
			GetRequest('feed/detail', {id: this.state.id}).then(
					res => {
							this.setState({
									detail: res.data,
							});
							
					},
			);
			GetRequest('comment/query', {
				infoId: this.state.id,
				infoType:2,
				limit:500,
				page:1
			}).then(
				res => {
					this.setState({
						commentList:res.data
					})
				},
			);
    }
    handleComment(item){
			this.setState({
				currentComment:item
			})
		}

    componentDidMount() {
        this.getDetail();
		}
		handlePublish(){
			PostRequest('comment/publish',{
				content: this.state.comment,
				infoId: this.state.id,
				infoType : 2,
				toUserId: this.state.currentComment.userId||null,
				userId: 12342
			}).then(() => {
				this.getDetail();
				this.setState({
					comment:'',
					currentComment:{},
					placeholder:'请发表评论'
				})
			})
		}
    render() {
				const {detail} = this.state;
        return (
					<Fragment>
						<SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
            <SafeAreaView style={styles.container}>
                <Header {...this.props} title="动态详情" left={null} />
                <View style={styles.main}>
                    <User data={detail} {...this.props}/>
                    <Text style={styles.words}>{detail.content}</Text>
                    <Photo data={detail} />
                    <Action data={detail} />
										{
											this.state.commentList.map(item => {
												return (
													<TouchableOpacity onPress={() => this.handleComment(item)}>
															<Comment data={item}/>
													</TouchableOpacity>
												)
											})
										}
                    
                </View>
                <View style={styles.comment_box}>
                  <Image style={styles.comment_avatar} source={defaultImage}/>
									<View style={styles.comment_text_box}>
										<TextInput 
											style={styles.comment_text} 
											placeholder={this.state.placeholder}
											value={this.state.content}
											onChangeText={(text) => this.setState({comment:text})}></TextInput>
									</View>
									<TouchableOpacity onPress={() => this.handlePublish()}>
										<View style={styles.comment_btn}>
											<Text style={styles.comment_btn_txt}>发表</Text>
										</View>
									</TouchableOpacity>
                </View>
            </SafeAreaView>
						</Fragment>
				);
    }
}

const images = {
    photo: require('../../../assets/relationChain/bg-intro.png'),
};

const styles = StyleSheet.create({
    container: {
				backgroundColor:'#fff',
				position:'relative',
        height:'100%'
    },
    main:{
        paddingHorizontal:scaleSize(54)
    },
    words: {
        fontSize: scaleSize(48),
        color: '#564F5F',
        marginBottom: scaleSize(36),
    },
    comment_box:{
				width:'100%',
				position:'absolute',
				bottom:0,
				left:0,
        display:'flex',
				flexDirection:'row',
				paddingHorizontal:scaleSize(54),
				paddingVertical:scaleSize(27),
				paddingBottom:scaleSize(100),
				alignItems:'center',
				justifyContent:'space-between',
				borderStyle:'solid',
				borderColor:'#f2f2f2',
				borderTopWidth:scaleSize(2)
		},
		comment_avatar:{
			width:scaleSize(88),
			height:scaleSize(88),
			borderRadius:scaleSize(44),
		},
		comment_text_box:{
			width:scaleSize(650),
			height:scaleSize(78),
			borderRadius:scaleSize(39),
			borderColor:'#f2f2f2',
			borderStyle:'solid',
			borderWidth:scaleSize(2),
			backgroundColor:'#f2f2f2',
			display:'flex',
			paddingHorizontal:scaleSize(30)
		},
		comment_text:{
			flex: 1,
			height:scaleSize(48)
		},
		comment_btn:{
			width:scaleSize(160),
			height:scaleSize(78),
			borderRadius:scaleSize(39),
			backgroundColor:'#564f5f',
			display:'flex',
			alignItems:'center',
			justifyContent:'center'
		},
		comment_btn_txt:{
			fontSize:scaleFont(40),
			color:'#fff'
		}
});
