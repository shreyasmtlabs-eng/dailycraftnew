
import { StyleSheet } from 'react-native';
import { px, deviceWidth, deviceHeight } from '../../utils/dimensions';
import { FONT } from '../../assets/fonts';
import color from '../../constant/color';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary,
  },

  headerBackground: {
    width: '100%',
    height: deviceHeight * 0.32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: deviceWidth * 0.06,
    paddingTop: deviceHeight * 0.05,
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
  },

  banner: {
    paddingHorizontal: deviceWidth * 0.06,
    marginTop: deviceHeight * 0.01,
  },

  title: {
    color: color.downloadtext,
    fontSize: deviceWidth * 0.080,
    fontWeight: '500',
    lineHeight: deviceWidth * 0.08,
    marginTop: deviceHeight * 0.01,
    fontFamily:FONT.BOLD,
  },

  subtitle: {
    fontSize: deviceWidth * 0.037,
    color: color.downloadtext,
    marginTop: deviceHeight * 0.02,
    lineHeight: deviceWidth * 0.05,
    fontFamily:FONT.REGULAR,
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: deviceHeight * 0.06,
    paddingHorizontal: deviceWidth * 0.05,
  },

  card: {
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.28,
    backgroundColor: color. background,
    borderRadius: deviceWidth * 0.03,
    borderWidth: px(1.5),
    borderColor: color.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: deviceWidth * 0.03,
    borderStyle: 'dashed',
  },

  selectedCard: {
    borderColor: color.backbtn,
  },

  circle: {
    width: deviceWidth * 0.22,
    height: deviceWidth * 0.22,
    borderRadius: deviceWidth * 0.11,
    backgroundColor: color.card,
    marginBottom: deviceHeight * 0.018,
  },

  cardTitle: {
    fontSize: deviceWidth * 0.045,
    fontWeight: '600',
    color: color.cardtitle,
    fontFamily:FONT.SEMIBOLD,
  },

  cardDesc: {
    fontSize: deviceWidth * 0.032,
    color: color.carddes,
    textAlign: 'center',
    marginTop: deviceHeight * 0.01,
    fontFamily:FONT.REGULAR,
  },

  tickIcon: {
    position: 'absolute',
    top: deviceWidth * 0.03,
    right: deviceWidth * 0.03,
  },

  bottomContainer: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: '#FFF0ED',
    paddingHorizontal: deviceWidth * 0.06,
    paddingTop: deviceWidth * 0.04,
    paddingBottom: deviceWidth * 0.017,
    // borderTopWidth: px(1),
    // borderTopColor: '#eee',
    bottom: deviceHeight * 0.09,
  },
});
