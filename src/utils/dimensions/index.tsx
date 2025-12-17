import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');


const defaultPixelRatio = 1;
const designWidth = 360;
const designHeight = 800;

const dpWidth = designWidth / defaultPixelRatio;
const dpHeight = designHeight / defaultPixelRatio;

const scale = Math.min(height / dpHeight, width / dpWidth);

const deviceWidth = width;

const deviceHeight = height;

const ONE_PIXEL = StyleSheet.hairlineWidth;

/**
* @param size
*/
const px = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export { px, deviceHeight, deviceWidth, ONE_PIXEL };
