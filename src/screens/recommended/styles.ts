import { FONT } from './../../assets/fonts/index';
import { StyleSheet} from 'react-native';
import { px, deviceWidth } from '../../utils/dimensions';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:px(15),
  },
  backgroundImage: {

      flex: 1,
  },
  contentContainer: {
    alignItems: 'center',

  },
  header: {
    alignItems: 'center',
    marginTop: px(16),
    marginBottom: px(20),
  },
  title: {
    fontSize: px(25),
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: px(35),
    fontFamily:FONT.BOLD,

  },
  subtitle: {
    fontSize: px(15),
    color: color. textPrimary,
    textAlign: 'center',
    marginTop: px(10),
    lineHeight: px(23),
    fontWeight:'600',
     fontFamily:FONT. REGULAR,
  },
  imageWrapper: {

  width: deviceWidth,
  height: px(470),
  overflow: 'hidden',
  alignItems: 'center',
  },
  posterImage: {
    marginTop: px(20),
    // width: px(410),
     width: deviceWidth - px(40),
    height: px(420),
    borderRadius: px(15),
    marginLeft: px(20),
    marginRight: px(20),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: deviceWidth * 1,
    width : px(200),
    marginTop: px(12),
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: color.primary,
    borderRadius: px(10),
    paddingVertical: px(12),
    paddingHorizontal: px(20),
    marginRight: px(10),
    marginLeft: px(10),
    alignItems: 'center',
  },
  downloadText: {
    color: color.downloadtext,
    fontWeight: '600',
    fontSize: px(18),
  },
  nextBtn: {
    flex: 1,
    backgroundColor:color.primary,
    // backgroundColor:'red',
    borderRadius: px(10),
    paddingVertical: px(11),
    // paddingHorizontal: px(20),
    width:px(10),
    borderWidth: 1,
    marginRight: px(10),
    marginLeft: px(10),
    alignItems: 'center',
    borderColor: color.borderwhite,
  },
  nextText: {
    color: color.border,
    fontWeight: '600',
    fontSize: px(18),
  },
});

export default styles;
