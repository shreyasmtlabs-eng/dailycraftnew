
import { StyleSheet } from 'react-native';
import { px, deviceWidth, deviceHeight } from '../../../utils/dimensions';
import { FONT } from '../../../assets/fonts';
import color from '../../../constant/color';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },

  headerBackground: {
    width: '100%',
    height: deviceHeight * 0.35,
       marginBottom: deviceWidth * 0.04,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: deviceWidth * 0.06,
    paddingTop: deviceHeight * 0.03,
  },

  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceWidth * 0.1,
    width: deviceWidth * 0.1,
    borderRadius: deviceWidth * 0.03,
    backgroundColor: color.backbtn,
    borderWidth: px(2),
    borderColor: color.background,
    top:1,

  },

  banner: {
    paddingHorizontal: deviceWidth * 0.06,
    marginTop: deviceHeight * 0.02,
  },

  title: {
    fontSize: deviceWidth * 0.065,
    fontWeight: '700',
    color: color.contiuetext,
    fontFamily:FONT.BOLD,
  lineHeight: deviceWidth * 0.09,
  },

  subtitle: {
    fontSize: deviceWidth * 0.039,
    color: color.contiuetext,
    marginTop: deviceHeight * 0.01,
    lineHeight: deviceWidth * 0.06,
    fontFamily:FONT.REGULAR,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: deviceWidth * 0.15,
    marginTop: deviceHeight * 0.05,
    marginLeft:px(10),
marginRight:px(10),
  },

  otpBox: {
    width: deviceWidth * 0.13,
    height: deviceWidth * 0.13,
    borderRadius: deviceWidth * 0.02,
    borderWidth: px(1.2),
    borderColor: color.card,
    backgroundColor: color.background,
    textAlign: 'center',
    fontSize: deviceWidth * 0.05,
    color: color.cardtitle,
    fontWeight: '600',
  },
  resendText: {
    textAlign: 'center',
    color: color.carddes,
    fontSize: deviceWidth * 0.035,
    marginTop: deviceHeight * 0.02,
    fontFamily:FONT.MEDIUM,
  },

  resendLink: {
    color: color.backbtn,
    fontWeight: '600',

  },

  verifyButton: {
    position: 'absolute',
    bottom: deviceHeight * 0.04,
    alignSelf: 'center',
    width: deviceWidth * 0.9,
    backgroundColor: color.backbtn,
    paddingVertical: deviceWidth * 0.035,
    borderRadius: deviceWidth * 0.02,
     marginBottom: deviceHeight * 0.02,
  },

  verifyButtonText: {
    textAlign: 'center',
    color: color.background,
    fontSize: deviceWidth * 0.045,
    fontWeight: '600',
  },

  errorText: {
    color: 'red',
    fontSize: deviceWidth * 0.033,
    marginTop: deviceWidth * 0.03,
    fontWeight: '500',
    alignSelf: 'center',
  },
});
