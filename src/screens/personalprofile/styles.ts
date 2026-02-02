
import { StyleSheet } from 'react-native';
import { deviceWidth, px } from '../../utils/dimensions';
import { FONT } from '../../assets/fonts';
import color from '../../constant/color';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.downloadtext,
    // backgroundColor:color.secondary,
    paddingHorizontal: px(20),
    paddingTop: px(21),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: px(10),
  },

  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px(44),
    width: px(44),
    borderRadius: px(15),
    backgroundColor: color.backbtn,
    marginTop: px(15),
  },

  headerText: {
    fontSize: px(22),
    fontWeight: '600',
    textAlign: 'center',
    width: '80%',
    marginTop: px(15),
    fontFamily:FONT.BOLD,
  },

  logoBox: {
    marginTop: px(16),
    alignSelf: 'center',
    width: deviceWidth * 0.45,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: px(2),
    borderStyle: 'dashed',
    borderColor: color.logobox,
    borderRadius: px(20),
    padding: px(6),
    marginVertical: px(25),
    marginBottom: px(10),
    height: deviceWidth * 0.37,
  },

  logoText: {
     color: color.carddes,
    marginVertical: px(15),
    fontSize: px(12),
    textAlign: 'center',
  },

  textlarge: {
    height: px(70),
    textAlignVertical: 'top',
  },

  label: {
    fontSize: px(14),
    marginTop: px(20),
    marginBottom: px(5),
    color: color.label,
    marginLeft: px(12),
  },

  input: {
    borderWidth: px(1),
    borderColor:color.input,
    borderRadius: px(12),
    padding: px(13),
    fontSize: px(16),
    color: color.title,
  },

  bottomContainer: {
    marginTop: px(30),
  },

  continueText: {
    marginTop: px(30),
    color: 'color.contiuetext',
    fontWeight: 'bold',
    fontSize: px(18),
    marginBottom: px(5),
    textAlign: 'center',
  },

  switchBtn: {
    marginBottom: px(10),
    alignItems: 'center',
  },

  switchText: {
    color: color.switchtext,
    textAlign: 'center',
    marginTop: px(20),
    fontWeight: '700',
    marginBottom: px(5),
    fontFamily:FONT.MEDIUM,
  },

  switchtext1: { color: color.label },
  switchtext2: { color: color.backbtn,
      fontFamily:FONT.MEDIUM,
  },


  logoImage: {
    marginTop: px(15),
  },


uploadimageicon: {
  width: deviceWidth * 0.06,
  height: deviceWidth * 0.06,
  resizeMode: 'contain',
  marginBottom: px(2),
  marginTop:px(7),
},


  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(6),
  },

  uploadIconImage: {},

  pickButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: px(5),
    width: deviceWidth * 0.3,
     marginBottom:px(8),
     marginTop:px(2),

  },

  pickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.backbtn,
    paddingVertical: px(6),
    paddingHorizontal: px(4),
    borderRadius: px(10),
    // marginBottom:px(5),
  },

  pickTxt: {
    color: color.contiuetext,
    marginLeft: px(6),
    fontSize: px(12),
    fontWeight: '500',
  },

  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: px(20),
  },


sheetBtn: {
   flexDirection: 'row',
    alignItems: 'center',
    gap: px(10),
    paddingVertical: px(12),
},

sheetBtnText: {
  fontSize: 19,

},

sheetCancelBtn: {
 marginTop: px(10),
    alignItems: 'center',
    paddingVertical: px(12),
},
errorText:{
marginLeft:px(14),
color:'red',
fontSize:px(12),
},
sheetCancelText:{
textAlign: 'center', fontSize: 16, fontWeight: '600' ,
},


});
