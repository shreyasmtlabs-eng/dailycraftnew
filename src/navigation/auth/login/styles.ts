
import { StyleSheet } from 'react-native';
import { px, deviceWidth, deviceHeight } from '../../../utils/dimensions';
// import { FONT } from '../../../assets/fonts';
import color from '../../../constant/color';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },

  headerBackground: {
    width: deviceWidth,
    height: deviceHeight * 0.35,
    paddingHorizontal: deviceWidth * 0.06,
    paddingTop: deviceHeight * 0.07,
      marginBottom: deviceWidth * 0.04,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceWidth * 0.1,
    width: deviceWidth * 0.1,
    borderRadius: deviceWidth * 0.03,
    backgroundColor:color.primary,
    borderColor: color.background,
    borderWidth: px(2),
  },

  backArrow: {
    fontSize: deviceWidth * 0.07,
    color:color.background,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  skip: {
    color: color.background,
    fontSize: deviceWidth * 0.04,
    fontWeight: '500',
    marginTop: deviceHeight * 0.015,
    marginBottom: deviceWidth * 0.04,
  },

  banner: {
    marginTop: deviceHeight * 0.015,
  },

  title: {
    color: color.downloadtext,
    fontSize: deviceWidth * 0.065,
    fontWeight: '700',
    lineHeight: deviceWidth * 0.09,
    marginTop: deviceHeight * 0.01,
    // fontFamily:FONT.BOLD,
  },

  subtitle: {
    color: color.downloadtext,
    fontSize: deviceWidth * 0.036,
    marginTop: deviceWidth * 0.02,
    width: '90%',
    lineHeight: deviceWidth * 0.06,
    // fontFamily:FONT.REGULAR,
  },

  inputSection: {
    paddingHorizontal: deviceWidth * 0.06,
    marginTop: deviceWidth * 0.08,

  },

  label: {
    color: color.personallebal,
    fontWeight: '500',
    marginBottom: deviceWidth * 0.02,
    fontSize: deviceWidth * 0.033,
    // fontFamily:FONT.MEDIUM,

  },

  inputBox: {
    borderWidth: px(1),
    borderColor:color.logobox,
    borderRadius: deviceWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: deviceWidth * 0.04,
    backgroundColor: color.contiuetext,

  },

  flagIcon: {
    width: deviceWidth * 0.07,
    height: deviceWidth * 0.05,
    marginRight: deviceWidth * 0.02,
  },

  countryCode: {
    fontWeight: '600',
    fontSize: deviceWidth * 0.04,
    marginRight: deviceWidth * 0.02,
  },

  input: {
    flex: 1,
    paddingVertical: deviceWidth * 0.03,
    fontSize: deviceWidth * 0.043,
  },

  callIcon: {
    width: deviceWidth * 0.05,
    height: deviceWidth * 0.05,
    tintColor: color.primary,
  },

  helperText: {
    marginTop: deviceWidth * 0.02,
    color: color.personallebal,
    fontSize: deviceWidth * 0.03,
      marginLeft: deviceWidth * 0.01,
      // lineHeight:11,
      // fontFamily:FONT.REGULAR,
      lineHeight:px(17),
      fontWeight:'400',
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: color.secondary,
    paddingHorizontal: deviceWidth * 0.06,
    paddingTop: deviceWidth * 0.04,
    paddingBottom: deviceWidth * 0.02,
    // borderTopWidth: px(1),
    // borderTopColor: '#eee',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: deviceWidth * 0.04,
  },

  checkbox: {
  width: deviceWidth * 0.070,
  height: deviceWidth * 0.070,
  borderRadius: px(8),
  borderWidth: px(2),
  borderColor: color.primary,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.primary,
   marginRight: deviceWidth * 0.03,
},


  checkboxLabel: {
    flex: 1,
    color: color.switchText,
    fontSize: deviceWidth * 0.029,
    lineHeight: deviceWidth * 0.045,
    // fontFamily:FONT. MEDIUM,
  },

  link: {
    color: color.personallebal,
    fontWeight: '600',
  },

  privacyText: {
    textAlign: 'center',
    color: color.privacytext,
    marginTop: deviceWidth * 0.05,
    fontSize: deviceWidth * 0.043,
    textDecorationLine: 'underline',
    marginBottom: deviceWidth * 0.05,
    fontWeight: '300',
    // fontFamily:FONT.SEMIBOLD,
  },

  waveBottom: {
    width: '100%',
    height: deviceHeight * 0.05,
    resizeMode: 'cover',
    marginTop: px(-1),
    borderColor: color.background,
  },

  errorText: {
    color: 'red',
    fontSize: deviceWidth * 0.033,
    marginTop: deviceWidth * 0.02,
    fontWeight: '500',
  },

safeArea: {
  flex: 1,
  backgroundColor: color.secondary,
},

keyboardView: {
  flex: 1,
},

scrollContent: {
  flexGrow: 1,
  paddingBottom: 260,
},

countryPickerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: 8,
},

separatorLine: {
  width: 1,
  height: '60%',
  backgroundColor: color.logobox,
  marginHorizontal: 8,
  marginRight: 10,
  alignSelf: 'center',
},

checkboxIcon: {
  marginTop: 1,
  transform: [{ scaleX: 1.32 }, { scaleY: 1.32 }],
},

errorBorder: {
  borderColor: 'red',
  borderWidth: 1,
},

});
