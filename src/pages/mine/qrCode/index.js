import React, {Fragment, Component} from 'react'
import {StyleSheet, View, Image, Text, ImageBackground, SafeAreaView} from 'react-native'
import Header from '../../../components/header'
import {scaleSize, scaleFont} from '../../../utils/scaleUtil'
import QRCode from "react-native-qrcode-generator";

const imgUrl = {
    scanIcon: require('../../../assets/mine/QR-icon.png'),
    arrowIcon: require('../../../assets/mine/arrow_right.png'),
    qrCodeBg: require('../../../assets/mine/QR-code-bg.png'),
    avatar: require('../../../assets/mine/avatar.jpeg'),
    downloadIcon: require('../../../assets/mine/download-icon.png'),
    shareIcon: require('../../../assets/mine/share-icon.png')
}
export default class QrCode extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <SafeAreaView style={styles.pages}>
                    <View style={styles.container}>
                        <View style={styles.qrItemBox}>
                            <View style={styles.qrItem}>
                                <Image source={imgUrl.scanIcon} style={styles.scanIcon}></Image>
                                <Text style={styles.scanText}>扫一扫</Text>
                            </View>
                            <View style={styles.qrItem}>
                                <Image source={imgUrl.arrowIcon} style={styles.arrowIcon}></Image>
                            </View>
                        </View>
                        <View style={styles.qrCodeWrapper}>
                            <ImageBackground source={imgUrl.qrCodeBg} style={styles.qrBg}>
                                <Image source={imgUrl.avatar} style={styles.avatar}></Image>
                                <Text style={styles.userName}>钱罗罗</Text>
                                <View style={styles.codeContainer}>
                                    <QRCode
                                        value={'123123123123123'}
                                        size={scaleSize(520)}
                                        bgColor='black'
                                        fgColor='white'/>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.operationBox}>
                            <View style={styles.operationItem}>
                                <Image source={imgUrl.downloadIcon} style={styles.btnIcon}></Image>
                                <Text style={styles.btnText}>下载</Text>
                            </View>
                            <View style={styles.operationItem}>
                                <Image source={imgUrl.shareIcon} style={styles.btnIcon}></Image>
                                <Text style={styles.btnText}>分享</Text>
                            </View>
                        </View>
                        <Text style={styles.slogan}>[走，带你去看花花世界]</Text>
                    </View>
                </SafeAreaView>
            </Fragment>
        )
    }
}


const styles = StyleSheet.create({
    pages: {
        paddingBottom: scaleSize(200),
        height: '100%'
    },
    container: {
        backgroundColor: '#fff',
        height: '100%'
    },
    qrItemBox: {
        borderTopWidth: scaleSize(2),
        borderColor: '#f2f2f2',
        height: scaleSize(150),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(54),
        paddingRight: scaleSize(54)
    },
    qrItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    scanIcon: {
        width: scaleSize(50),
        height: scaleSize(50),
        marginRight: scaleSize(24)
    },
    scanText: {
        fontSize: scaleFont(48),
        color: '#333',
        lineHeight: scaleSize(150)
    },
    arrowText: {
        fontSize: scaleFont(36),
        color: '#999',
        lineHeight: scaleSize(150)
    },
    arrowIcon: {
        width: scaleSize(50),
        height: scaleSize(50),
        marginLeft: scaleSize(6)
    },
    qrCodeWrapper: {
        borderTopWidth: scaleSize(24),
        borderColor: '#f2f2f2',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrBg: {
        width: scaleSize(800),
        height: scaleSize(1000),
        marginTop: scaleSize(220),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    avatar: {
        position: 'absolute',
        top: scaleSize(-100),
        left: scaleSize(280),
        width: scaleSize(240),
        height: scaleSize(240),
        borderRadius: scaleSize(120)
    },
    userName: {
        fontSize: scaleFont(48),
        color: '#564f5f',
        textAlign: 'center',
        marginTop: scaleSize(32),
        marginBottom: scaleSize(32),
    },
    qrCode: {
        width: scaleSize(520),
        height: scaleSize(520),
        backgroundColor: 'red',
        marginTop: scaleSize(62),
        marginLeft: scaleSize(142)
    },
    operationBox: {
        marginTop: scaleSize(100),
        paddingLeft: scaleSize(327),
        paddingRight: scaleSize(327),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    operationItem: {
        display: 'flex',
        flexDirection: 'column'
    },
    btnIcon: {
        width: scaleSize(66),
        height: scaleSize(66),
        marginBottom: scaleSize(12)
    },
    btnText: {
        fontSize: scaleFont(32),
        color: '#333'
    },
    slogan: {
        marginTop: scaleSize(66),
        textAlign: 'center',
        color: '#333',
        fontSize: scaleFont(52)
    },
    codeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
