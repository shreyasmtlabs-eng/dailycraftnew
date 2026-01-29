
import { StyleSheet } from 'react-native';
import { px, deviceWidth } from '../../utils/dimensions';
import { FONT } from '../../assets/fonts/index';
import color from '../../constant/color';
const ITEM_MARGIN = px(14);
const ITEM_SIZE = (deviceWidth - ITEM_MARGIN * 3) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
     marginTop: px(13),
  },
  backgroundImage: {
    width: deviceWidth,
    height: '100%',
  },
  header: {
    alignItems: 'center',
    marginTop: px(20),
    marginBottom: px(15),
    paddingHorizontal: px(20),
  },
  title: {
    fontSize: px(28),
    marginTop: px(10),
fontFamily:FONT.BOLD,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: px(15),
    textAlign: 'center',
    marginTop: px(5),
    width: deviceWidth * 0.8,
    lineHeight: px(20),
    fontFamily:FONT. REGULAR,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: ITEM_MARGIN,
    marginTop: px(10),
    //  width: deviceWidth  - px(20),
    marginLeft:px(10),
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.1,
    backgroundColor: color.gridbackboardcolor,
    borderColor: color.background,
    borderWidth: px(8),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: color.title,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: px(2) },
    shadowRadius: px(1),
    elevation: 2,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    borderRadius: px(8),
  },
  noDataText: {

  },
downloadselectimage:{
  marginTop: 20,
  backgroundColor: '#FF984F',
  paddingVertical: 10,
  paddingHorizontal: 40,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',

  },
  downloadoutline:{
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },


 url :{ width: '90%',
    height: '70%',
     borderRadius: 10,
     },

    modelshow: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.9)',
      justifyContent: 'center',
      alignItems: 'center',

    },
});

export default styles;
