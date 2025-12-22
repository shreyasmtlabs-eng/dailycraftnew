
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavigationProp>();


  useEffect(() => {
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
        const isRegisterStr = await AsyncStorage.getItem('is_register');
        const isRegister = isRegisterStr === 'true';

      console.log('RAW is_register value:>>>>', isRegister);

      console.log(' Token:>>>>>', token);
       console.log('isRegister:', isRegister);

      if (token && isRegister) {

        navigation.navigate('MainTabs');
      } else if (token && !isRegister) {

        navigation.navigate('ChooseProfileType');
      } else {

        navigation.navigate('Auth');
      }
    }, 3000);
    return () => clearTimeout(timer);

  }, [navigation]);



  return (
    <View style={[styles.splashBox]}>
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
