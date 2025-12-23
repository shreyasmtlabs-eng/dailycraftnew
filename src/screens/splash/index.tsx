

import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../navigation/types';
import { RootState } from '../../redux/store';
import styles from './styles';

type SplashNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  const token = useSelector((state: RootState) => state.auth.token);
  const isRegistered = useSelector(
    (state: RootState) => state.profile.isRegistered
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Token:', token);
      console.log('isRegistered:', isRegistered);

      if (token && isRegistered) {
        navigation.navigate('MainTabs');
      } else if (token && !isRegistered) {
        navigation.navigate('ChooseProfileType');
      } else {
        navigation.navigate('Auth');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [token, isRegistered, navigation]);

  return (
    <View style={styles.splashBox}>
      <View style={styles.rowBox}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
