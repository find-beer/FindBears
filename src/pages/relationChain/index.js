import React from 'react';
import {StyleSheet, View, Text, ImageBackground,SafeAreaView} from 'react-native';
import { scaleSize,scaleFont } from '../../utils/scaleUtil';
import Header from '../../components/header/index'

export default class relationChain extends React.Component {
    render() {
        return (
            <Fragment>
                <SafeAreaView style={{flex: 0, backgroundColor: 'white'}}/>
                <SafeAreaView style={styles.main}>
                    <Header {...this.props} title="关系链" />
                    <View style={styles.container}>
                        {/*  基本信息 */}
                        <ImageBackground
                            source={images.bgIntro}
                            style={styles.intro}>
                            <View style={styles.mine}>
                                <ImageBackground
                                    source={images.bearPurple}
                                    style={styles.introHeadshot}
                                />
                                <Text style={styles.introName}>李小二个</Text>
                            </View>
                            <View style={styles.chain} />
                            <View style={styles.friend}>
                                <ImageBackground
                                    source={images.bearGray}
                                    style={styles.introHeadshot}
                                />
                                <Text style={styles.introName}>李小二个</Text>
                            </View>
                        </ImageBackground>

                        {/* 详细信息 */}
                        <View style={styles.detail}>
                            <Text style={styles.detailTitle}>详细关系链</Text>
                            <View style={styles.detailContent}>
                                <View style={styles.detailLeft}>
                                    <View>
                                        <ImageBackground
                                            source={images.bearGray}
                                            style={styles.detailHeadshot}
                                        />
                                        <Text style={styles.detailName}>
                                            李小二个
                                        </Text>
                                    </View>
                                    <ImageBackground
                                        source={images.chainShort}
                                        style={styles.chainShort}
                                    />
                                    <View>
                                        <ImageBackground
                                            source={images.bearGray}
                                            style={styles.detailHeadshot}
                                        />
                                        <Text style={styles.detailName}>
                                            李小二个
                                        </Text>
                                    </View>
                                    <ImageBackground
                                        source={images.chainShort}
                                        style={styles.chainShort}
                                    />
                                    <View>
                                        <ImageBackground
                                            source={images.bearGray}
                                            style={styles.detailHeadshot}
                                        />
                                        <Text style={styles.detailName}>
                                            李小二个
                                        </Text>
                                    </View>
                                </View>
                                <ImageBackground
                                    source={images.chainLong}
                                    style={styles.chainLong}
                                />
                                <View style={styles.detailRight}>
                                    <View>
                                        <ImageBackground
                                            source={images.bearGray}
                                            style={styles.detailHeadshot}
                                        />
                                        <Text style={styles.detailName}>
                                            李小二个
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* 提示信息 */}
                        <View style={styles.tips}>
                            <View style={styles.row1}>
                                <ImageBackground
                                    source={images.bearGray}
                                    style={styles.tipsHeadshot}
                                />
                                <ImageBackground
                                    source={images.bearGray}
                                    style={styles.tipsLeft}
                                />
                            </View>
                            <View style={styles.row2}>
                                <ImageBackground
                                    source={images.bearGray}
                                    style={styles.tipsRight}
                                />
                                <ImageBackground
                                    source={images.bearGray}
                                    style={styles.tipsHeadshot}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const images = {
    bgIntro: require('../../assets/relationChain/bg-intro.png'),
    bearGray: require('../../assets/relationChain/bear-gray.png'),
    bearPurple: require('../../assets/relationChain/bear-purple.png'),
    chainShort: require('../../assets/relationChain/chain-short.png'),
    chainLong: require('../../assets/relationChain/chain-long.png'),
};

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#fff',
    },
    container: {
        paddingTop: scaleSize(66),
        paddingLeft: scaleSize(54),
        paddingRight: scaleSize(54),
        backgroundColor:'#fff',
    },
    intro: {
        width: '100%',
        height: scaleSize(428),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleSize(102),
    },
    mine: {
        alignItems: 'center',
    },
    friend: {
        alignItems: 'center',
    },
    introHeadshot: {
        width: scaleSize(180),
        height: scaleSize(180),
        marginBottom: scaleSize(23),
    },
    introName: {
        fontSize: scaleFont(36),
        color: '#FFFFFF',
    },
    chain: {
        width: scaleSize(418),
        marginLeft: scaleSize(28),
        marginRight: scaleSize(28),
    },
    detail: {
        marginBottom: scaleSize(170),
    },
    detailTitle: {
        fontSize: scaleFont(42),
        color: '#564F5F',
        marginBottom: scaleSize(54),
    },
    detailContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chainShort: {
        width: scaleSize(57),
        height: scaleSize(12),
        marginLeft: scaleSize(21),
        marginRight: scaleSize(21),
    },
    chainLong: {
        width: scaleSize(175.1),
        height: scaleSize(38.4),
        marginLeft: scaleSize(28.9),
        marginRight: scaleSize(28.9),
    },
    detailHeadshot: {
        width: scaleSize(132),
        height: scaleSize(132),
        marginBottom: scaleSize(28),
    },
    detailName: {
        fontSize: scaleFont(36),
        color: '#666666',
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: scaleSize(95),
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tipsHeadshot: {
        width: scaleSize(58),
        height: scaleSize(58),
        marginLeft: scaleSize(24),
        marginRight: scaleSize(24),
    },
    tipsLeft: {
        width: scaleSize(589),
        height: scaleSize(158),
    },
    tipsRight: {
        width: scaleSize(589),
        height: scaleSize(158),
    },
});
