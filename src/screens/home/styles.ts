import { StyleSheet } from 'react-native';
import {deviceHeight,deviceWidth,px} from '../../utils/dimensions';
import color from '../../constant/color';
export default StyleSheet.create({


  container: {
    flex: 1,
    paddingTop: 20,
  },

  backgroundImage: {
  flex: 1,
   width: deviceWidth,
    height: deviceHeight,

},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px(15),
    marginRight: px(19),
    marginLeft: px(10),



  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: px(10),
  },

profileImageContainer:{
width: px(42),
    height: px(42),
    borderColor: color.primary,
    borderRightWidth: px(4),
    borderBottomWidth: px(4),
    borderTopRightRadius: px(12),
    borderBottomRightRadius: px(15),
    borderTopLeftRadius: px(8),
    borderBottomLeftRadius: px(12),
    marginRight: px(10),
    overflow: 'hidden',
},

  profileImg: {
    width: px(42),
    height: px(42),
    borderRadius: px(10),
    marginRight: px(10),
    justifyContent:'center',
    alignItems:'center',

  },
  welcomeText: {
    fontSize: px(12),
    color: color.logotext,
  },
  userName: {
    fontSize: px(16),
    fontWeight: '600',
    color: color.title,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: px(25),
    height: px(25),
    marginLeft: px(15),
    tintColor: color.title,
  },
  crownIcon: {
    width: px(20),
    height: px(20),
    tintColor: color.crownIcon,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.contiuetext,
    borderRadius: px(16),
    paddingHorizontal: px(16),
    paddingVertical: px(10),
    marginBottom: px(10),
    marginLeft: px(15),
    marginRight: px(15),
    borderColor: color.input,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: px(8),
    color: color.title,
  },
    tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px(10),
       marginLeft: px(18),

       borderRadius: px(6),
       gap:px(5),
  },

  posterCard: {
    borderRadius: px(18),
    overflow: 'visible',
    marginBottom: px(15),


  },
  posterImg: {
    borderRadius: px(5),
    marginTop: px(10),
    // backgroundColor:'red',
  },
  fixedActionRow: {
  position: 'absolute',
  bottom: px(100),
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: px(10),
}
,
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px(110),
    marginTop:px(2),
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: color.primary,
    borderRadius: px(10),
    paddingVertical: px(12),
    marginRight: px(10),
    marginLeft: px(10),
    alignItems: 'center',
  },
  downloadText: {
    color: color.downloadtext,
    fontWeight: '600',
    fontSize: px(16),
  },
  nextBtn: {
    flex: 1,
    backgroundColor: color.downloadtext,
    borderRadius: px(10),
    paddingVertical: px(12),
    borderWidth: 1,
    marginRight: px(10),
    marginLeft: px(10),
    alignItems: 'center',
    borderColor: color.borderwhite,
  },
  nextText: {
    color: color.labelunfocused,
    fontWeight: '600',
    fontSize: px(16),
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: px(10),
    right: px(10),
    height: px(80),
    borderRadius: px(50),
    backgroundColor: color.secondary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: color.borderTopColor,
    marginBottom: px(10),
  },
  navItem: {
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: color.contiuetext,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: px(10),
    padding: px(6),
    marginLeft: px(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.title,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: px(2),
    elevation: 2,
  },
  iconContainer2: {
    backgroundColor: color.downloadtext,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: px(12),
    padding: px(6),
    marginLeft: px(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.title,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: px(2),
    elevation: 2,
  },
  activeIconBg: {
    backgroundColor: color.primary,
    borderRadius: px(30),
  },
  navIcon: {
    width: px(32),
    height: px(32),
    marginBottom: px(2),
  },
  navLabel: {
    fontSize: px(12),
    marginTop: px(3),
    fontWeight: '700',
  },
  download: {
    width: px(30),
    height: px(30),
    marginBottom: px(2),
  },
  filterBtn: {
    marginLeft: px(8),
    padding: px(5),
    borderRadius: px(8),
  },
  closeBtnText: {
    color: color.downloadtext,
    textAlign: 'center',
    fontWeight: '600',
  },
  headericon: {
    width: px(20),
    height: px(20),
  },
  navIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: px(26),
    height: px(26),
    borderRadius: px(26),
  },
  activeNavCircle: {
    backgroundColor: color. primary,
    elevation: 5,
    borderRadius: px(45),
    padding: px(10),
    width: px(50),
    height: px(50),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: px(20),
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
      maxHeight: deviceHeight * 0.8,
  minHeight: deviceHeight * 0.3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: px(20),
    borderTopRightRadius: px(20),
    paddingHorizontal: px(20),
    paddingTop: px(15),
    padding: px(60),

paddingBottom: px(20),

  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px(15),
  },
  modalTitle: {
    fontSize: px(24),
    fontWeight: '700',
    color: '#000',
  },
  closeBtn: {
    position: 'absolute',
    top: -px(25),
    right: px(15),
    backgroundColor: color.downloadtext,
    borderRadius: px(25),
    padding: px(10),
      zIndex: 10,
    elevation: 5,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.downloadtext,
    borderRadius: px(12),
    padding: px(15),
    marginBottom: px(10),
    elevation: 3,
  },
  avatarBorderBox: {
       width: px(48),
    height: px(48),
    borderColor: color.primary,
    borderRightWidth: px(4),
    borderBottomWidth: px(4),
    borderTopRightRadius: px(12),
    borderBottomRightRadius: px(15),
    borderTopLeftRadius: px(8),
    borderBottomLeftRadius: px(12),
    marginRight: px(10),
    overflow: 'hidden',
  },
  profileAvatarContainer: {
    borderLeftWidth: px(4),
    borderBottomWidth: px(4),
    borderColor: color.primary,
    borderRadius: px(12),
  },
  proimage:{
width: px(48),
    height: px(48),
    borderColor: color.primary,
    borderRightWidth: px(5),
    borderBottomWidth: px(5),
    borderTopRightRadius: px(12),
    borderBottomRightRadius: px(15),
    borderTopLeftRadius: px(8),
    borderBottomLeftRadius: px(12),
    marginRight: px(10),
    overflow: 'hidden',
  },
  profileAvatar: {
    width: px(50),
    height: px(50),
    borderRadius: px(10),
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: px(20),
    fontWeight: '700',
    color: '#000',
  },
  profileTag: {
    backgroundColor: color.primary,
    paddingHorizontal: px(6),
    paddingVertical: px(2),
    alignSelf: 'flex-start',
    marginTop: px(3),
  },
  profileTagText: {
    color: color.downloadtext,
    fontSize: px(12),
    fontWeight: '500',
  },
  createProfileBtn: {
    backgroundColor: color.primary,
    borderRadius: px(8),
    paddingVertical: px(16),
    alignItems: 'center',
  },
  createProfileText: {
    color: color.downloadtext,
    fontSize: px(19),
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: px(40),
  },
  loadingText: {
    marginTop: px(12),
    fontSize: px(16),
    color: '#666',
  },
  templateContainer: {
    alignItems: 'center',
  // marginHorizontal: px(10),

  },
  templateImage: {
    width: deviceWidth  - px(30),
    height: px(450),
    borderRadius: px(10),
    backgroundColor: '#f5f5f5',
    marginLeft:px(15),
    marginRight:px(15),
    marginTop:px(10),


  },
  placeholderImage: {
    // width: deviceWidth,
    // height: px(200),
    justifyContent:'flex-start',
    alignItems: 'center',
    // flex:2,

    // borderRadius: px(12),
  },
  templateInfo: {
    // marginTop: px(16),
    // width: deviceWidth,
    // paddingHorizontal: px(8),
    marginLeft:5,
    marginRight:5,
  },
  templateTitle: {
    fontSize: px(20),
    fontWeight: 'bold',
    color: color.switchText,
    textAlign: 'center',
    marginBottom: px(8),
  },
  templateDescription: {
    fontSize: px(12),
    marginLeft:2,
    marginRight:2,
    color: '#666',
    // textAlign: 'center',
    // lineHeight: px(20),
  },
  noTemplateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: px(40),
  },
  noTemplateText: {
    fontSize: px(16),
    color: '#999',
    textAlign: 'center',
  },
  navIconFocused: {
  tintColor: color.downloadtext,
},
labelFocused: {
  color: color.primary,
},
labelUnfocused: {
  color: color.labelunfocused,
},


});

