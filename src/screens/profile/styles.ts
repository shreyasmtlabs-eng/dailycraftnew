

import { StyleSheet } from 'react-native';
import { px, deviceWidth } from '../../utils/dimensions';
import { FONT } from '../../assets/fonts';
import color from '../../constant/color';
const FOOTER_BUTTON_WIDTH = (deviceWidth - px(60)) / 2;

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { width: deviceWidth, height: '100%' },

  headerContainer: { alignItems: 'center', marginTop: px(15) },
  title: { fontSize: px(25),
    fontFamily:FONT.BOLD,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: px(20),
    marginTop: px(20),
  },
  profileImage: { width: px(60), height: px(60), borderRadius: px(10) },
  profileInfo: { flex: 1, marginLeft: px(10) },
  profileName: { fontSize: px(16), fontWeight: '700', color: '#000' },

  roleBadge: {
    backgroundColor: color.primary,
    paddingHorizontal: px(10),
    paddingVertical: px(3),
    borderRadius: px(6),
    alignSelf: 'flex-start',
    marginTop: px(4),
  },
  roleText: { color: color.downloadtext, fontSize: px(12), fontWeight: '600' },

  editButton: {
    backgroundColor: color.editbutton,
    paddingVertical: px(6),
    paddingHorizontal: px(12),
    borderRadius: px(8),
  },
  editText: { color: color.downloadtext, fontSize: px(13), fontWeight: '600' },

  premiumCard: {
    flexDirection: 'row',
    backgroundColor: color.premiumcard,
    marginHorizontal: px(20),
    marginTop: px(15),
    borderRadius: px(13),
    padding: px(9),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  premiumIcon: { width: px(40), height: px(40), marginRight: px(10) },
  premiumTitle: { fontSize: px(15), fontWeight: '700', color: color.downloadtext },
  premiumSubtitle: { fontSize: px(13), color: color.downloadtext, marginTop: px(2) },
  upgradeButton: {
    backgroundColor: color.downloadtext,
    paddingVertical: px(4),
    paddingHorizontal: px(10),
    borderRadius: px(8),
  },
  upgradeText: { color: color.premiumcard, fontSize: px(12), fontWeight: '600' },


  sectionOuter: {
    backgroundColor: color.sectionouter,
    borderRadius: px(15),
    marginHorizontal: px(20),
    marginTop: px(18),
    // padding: px(4),
  },
  section: {
    backgroundColor: color.downloadtext,
    borderRadius: px(12),
    paddingHorizontal: px(15),
    paddingVertical: px(10),
  },
  sectionTitle: {
    fontSize: px(15),
    fontWeight: '700',
    color: color.title,
    marginBottom: px(8),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: px(8),
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontSize: px(14), color: color.optionleft, marginLeft: px(10) },
  divider: {
    height: px(1),
    backgroundColor: color.divider,
    marginLeft: px(32),
  },

  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: px(25),
    width: deviceWidth,
        borderRadius: px(8),
    marginTop: px(12),
  },
  footerButton: {
    width: FOOTER_BUTTON_WIDTH,
    borderRadius: px(8),
    paddingVertical: px(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: px(6),
    borderColor: color.downloadtext,
  },
  footerText: { fontSize: px(14), fontWeight: '600', color: color.title },

  optionIcon: {
    width: px(20),
    height: px(20),
    // tintColor: '#ff914d',
  },
});

export default styles;
