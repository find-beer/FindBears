import { Dimensions, Platform, StatusBar } from 'react-native'

export const isIphoneX = () => {
    const dimen = Dimensions.get('window')
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    )
}
export const ifIphoneX = (iphoneXStyle, regularStyle) => {
    if (isIphoneX()) {
        return iphoneXStyle
    }
    return regularStyle
}
export const getStatusBarHeight = safe => Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0
})
export const getBottomSpace = () => isIphoneX() ? 34 : 0


export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;

export function isPhoneX() {
    const nWD = Dimensions.get('window');
    const height = nWD.height > nWD.width ? nWD.height : nWD.width;
    return (Platform.OS === 'ios' && !Platform.isPad && (height === 812 || height === 896));
}
