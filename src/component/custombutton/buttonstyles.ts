
import { StyleSheet } from 'react-native';
import {color} from '../../constant/color';
import { deviceWidth, px } from '../../utils/dimensions';

export const buttonStyle = StyleSheet.create({
  buttonCOntainer: {
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: px(45),
    borderRadius: px(8),
    width: deviceWidth / 1.2,
    flexDirection: 'row',
  },
  buttontext: {
    color: 'white',
    fontSize: px(16),
    verticalAlign: 'middle',
  },
});
