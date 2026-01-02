

import { StyleSheet } from 'react-native';
import { deviceHeight as dh, deviceWidth as dw, px } from '../../utils/dimensions';
import { FONT } from '../../assets/fonts';
import color from '../../constant/color';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },

  headerBackground: {
    width: '100%',
    height: dh * 0.33,
      // marginTop:px(5),
    // marginBottom:px(20),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dw * 0.06,
    paddingTop: dh * 0.04,

  },

  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dw * 0.1,
    width: dw * 0.1,
    borderRadius: dw * 0.03,
    backgroundColor: color.backbtn,
    borderWidth: px(2),
    borderColor: color. background,
  },

  banner: {
    paddingHorizontal: dw * 0.06,
    marginTop: dh * 0.01,
    //  backgroundColor:'red',
  },

  title: {
    color: color.downloadtext,
    fontSize: px(24),
    fontWeight: '600',
    lineHeight: px(27),
    marginTop: dh * 0.01,
    fontFamily:FONT.BOLD,
    marginBottom:px(17),
  },

  subtitle: {
    fontSize: px(13),
    color: color.downloadtext,
    marginTop: dh * 0.02,
    lineHeight: px(22),
    fontFamily:FONT.REGULAR,
  },

  grid: {
    marginTop: dh * 0.05,
    paddingHorizontal: dw * 0.06,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dh * 0.02,
  },

  langCard: {
    width: dw * 0.42,
    height: dh * 0.1,
    backgroundColor: color.background,
    borderRadius: dw * 0.03,
    borderWidth: px(1.5),
    borderColor: color.card,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  selectedCard: {
    borderColor: color.backbtn,
  },

  langText: {
    fontSize: px(18), // width * 0.045
    fontWeight: '600',
    color: '#1E293B',
  },

  tickIcon: {
    position: 'absolute',
    top: dw * 0.02,
    right: dw * 0.02,
  },

  bottomContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: color.secondary,
    paddingHorizontal: dw * 0.06,
    paddingTop: dw * 0.04,
    paddingBottom: dw * 0.05,
    borderTopWidth: px(1),
    borderTopColor: color.borderTopColor,
    bottom: dh * 0.07,
  },
});
