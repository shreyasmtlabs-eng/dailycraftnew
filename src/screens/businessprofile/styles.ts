
import { StyleSheet } from 'react-native';
import { deviceWidth as dw, px } from '../../utils/dimensions';
import { FONT } from '../../assets/fonts';
import color from '../../constant/color';
export default StyleSheet.create({
    flex: { flex: 1 },
  container: {
    backgroundColor:color.contiuetext,
    paddingHorizontal: px(dw * 0.05),
    paddingTop: px(dw * 0.04),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px(dw * 0.01),
  },

  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px(dw * 0.1),
    width: px(dw * 0.1),
    borderRadius: px(dw * 0.03),
    backgroundColor: color.backbtn,
  },

  headerText: {
    fontSize: px(dw * 0.06),
    fontWeight: '700',
    textAlign: 'center',
    width: '80%',
    fontFamily:FONT.BOLD,
  },

  logoBox: {
    // marginTop: px(dw * 0.04),
    alignSelf: 'center',
    width: '35%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: px(2),
    borderStyle: 'dashed',
    borderColor: color.logobox,
    borderRadius: px(dw * 0.05),
    // padding: px(dw * 0.01),
    marginVertical: px(dw * 0.055),
    marginBottom: px(dw * 0.01),
    height: px(dw * 0.35),
    // backgroundColor:'red',
  },

  logoText: {
    color: color.logotext,
    marginVertical: px(dw * 0.05),
    fontSize: px(dw * 0.03),
    alignSelf: 'center',
    fontFamily:FONT.REGULAR,
    lineHeight:px(15),
  },

  textlarge: {
    height: px(dw * 0.2),
    textAlignVertical: 'top',

  },

  uploadBtn: {},

  uploadimageicon: {
     marginTop: px(dw * 0.08),
  },

  uploadIcon: {

  },

  uploadText: {
    color: color. background,
    fontWeight: '600',
    fontSize: px(dw * 0.03),
    marginLeft: px(dw * 0.02),
    marginBottom: px(dw * 0.03),
  },

  logoImage: {
    marginTop: px(dw * 0.03),
  },

  label: {
    fontSize: px(dw * 0.035),
    marginTop: px(dw * 0.01),
    marginBottom: px(dw * 0.01),
    color: color.personallebal,
    marginLeft: px(dw * 0.02),
  },

  input: {
    borderWidth: px(1),
    borderColor: color.input,
    borderRadius: px(dw * 0.02),
    padding: px(dw * 0.03),
    fontSize: px(dw * 0.035),
    color: color.title,
  },

  bottomContainer: {
    marginTop: px(dw * 0.02),
  },

  continueText: {
    marginTop: px(dw * 0.02),
    color: color.contiuetext,
    fontWeight: 'bold',
    fontSize: px(dw * 0.04),
    marginBottom: px(dw * 0.01),
  },

  switchBtn: {
    marginTop: px(dw * 0.01),
    marginBottom: px(dw * 0.02),
    alignItems: 'center',
  },

  switchText: {
    color: color.personallebal,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: px(dw * 0.035),
    fontFamily:FONT. MEDIUM,

  },

  switchtext1: {
    color: color.personallebal,
    marginBottom: px(dw * 0.015),
  },

  switchtext2: {
    color: color.backbtn,
      fontFamily:FONT.MEDIUM,
  },

  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(dw * 0.02),
  },

  uploadIconImage: {},

  pickButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: px(3),
    // marginTop: px(dw * 0.01),
    width: px(dw * 0.3),
        marginBottom: px(dw * 0.03),
  },

  pickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.backbtn,
    paddingVertical: px(dw * 0.02),
    paddingHorizontal: px(dw * 0.02),
    borderRadius: px(dw * 0.02),
      marginBottom: px(dw * 0.07),
  },

  pickTxt: {
    color: color.contiuetext,
    // marginLeft: px(1),
    fontSize: px(dw * 0.03),
    fontWeight: '500',
  },

  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: px(dw * 0.05),
  },

modalOverlay: {
  flex: 1,
  backgroundColor: color.title,
  justifyContent: 'center',
  alignItems: 'center',
},

bottomSheet: {
  width: '85%',
  backgroundColor: color.contiuetext,
  borderRadius: px(20),
  paddingVertical: px(25),
  paddingHorizontal: px(20),
  shadowColor: color.title,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
},

bottomSheetTitle: {
  fontSize: px(16),
  fontWeight: '600',
  textAlign: 'center',
  marginBottom: px(15),
},

bottomSheetBtn: {
  flexDirection: 'row',
    alignItems: 'center',
    gap: px(10),
    paddingVertical: px(12),
},

bottomSheetBtnText: {
  fontSize: px(16),
},

bottomSheetCancel: {
   marginTop: px(10),
    alignItems: 'center',
    paddingVertical: px(12),
},

bottomSheetCancelText: {
  fontSize: px(16),
    color: color.errorBorder,
},


 errorBorder: {
    borderColor: color.errorBorder,
  },
error:{
marginLeft:px(8),
color:color.errorBorder,
fontSize:px(12),

},

 scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 15,
  },


});
