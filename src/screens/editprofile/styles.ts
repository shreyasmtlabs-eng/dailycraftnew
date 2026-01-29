import { FONT } from './../../assets/fonts/index';
import { StyleSheet } from 'react-native';
import color from '../../constant/color';
import { px } from '../../utils/dimensions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop:px(28),
  },
    backgroundImage: {
  // flex: 1,
  width: '100%',
  height: '100%',
},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf:'center',
      justifyContent: 'center',
    padding: 12,
      //  paddingVertical: 15,
        position: 'relative',
  },
  backBtn: {
  position: 'absolute',
  top: 20,
  left: 15,
  backgroundColor: color.background,
  borderRadius: 10,
  borderColor:color.bckbtw,
  padding: 6,
  elevation: 3,
  shadowColor: color.title,
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  zIndex: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily:FONT.BOLD,
    fontWeight: '700',
    color: color.title,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 8,


  },
  logoBox: {
  borderWidth: 2,
  borderColor: color.editlogobox,
  borderStyle: 'dashed',
  borderRadius: 13,
  alignItems: 'center',
  justifyContent: 'center',
  width: '35%',
  aspectRatio: 1,
  backgroundColor: color.  background,
  overflow: 'hidden',

  },
  uploadIconContainer: {
    // padding: 10,
    borderRadius: 100,
    backgroundColor: color.contiuetext,
    // borderWidth: 1,
    // borderColor: '#ddd',
    marginBottom: 10,
  },
  logoImage: {
    // width: 60,
    // height: 60,
    // borderRadius: 10,
     width: '100%',
  height: '100%',
  resizeMode: 'cover',
  borderRadius: 13,

  },
  uploadText: {
    fontSize: 12,
    color: color.uploadtext,
    textAlign: 'center',
    marginVertical: 5,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.uploadbtn,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 9,
    marginTop: 8,
    marginBottom:5,
  },
  uploadBtnText: {
    color: color.contiuetext,
    fontWeight: '600',
    fontSize: 14,
  },

  formContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: color.editlabel,
    fontWeight: '500',
    marginBottom: 6,
    marginLeft:20,
  },
  input: {
    borderWidth: 1,
    borderColor: color.input,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: color.contiuetext,
    marginLeft:10,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
    color:color.editlabel,
  },

  bottomContainer: {
  // // marginTop: 10,
  // alignItems: 'center',
  // justifyContent: 'center',
  //   paddingHorizontal: 45,
  //   width:'40%',
  //   alignSelf:'center',
  alignItems: 'center',
  justifyContent: 'center',
  // paddingHorizontal: 13,
  width: '60%',
  alignSelf: 'center',

  },


  switchContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    marginTop:5,
  },
  switchText: {
    color: color.switchText,
  },
  switchHighlight: {
    color: color.uploadbtn,
    fontWeight: '600',
  },
});

export default styles;
