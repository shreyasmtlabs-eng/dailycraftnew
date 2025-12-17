import { StyleSheet } from 'react-native';
import { px } from '../../utils/dimensions';

const styles = StyleSheet.create({
  splashBox: {
  flex: 1,
    margin: 0,
    padding: 0,
  },
  rowBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
       width: '100%',
    height:  px(800),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height:  '100%',
  },
});

export default styles;
