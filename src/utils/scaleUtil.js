import { Dimensions, PixelRatio } from 'react-native'

const defaultPixel = 3
const designWidth = 1080 / defaultPixel
const designHeight = 1920 / defaultPixel

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
const pixelRatio = PixelRatio.get()
const fontScale = PixelRatio.getFontScale()

const scale = Math.min(deviceWidth / designWidth, deviceHeight / designHeight)

export const scaleFont = size => Math.round((size * scale + 0.5) / fontScale / defaultPixel)
export const scaleSize = size => Math.round(size * scale + 0.5) / defaultPixel
export const scaleDp = size => Math.round(size * pixelRatio + 0.5) / defaultPixel