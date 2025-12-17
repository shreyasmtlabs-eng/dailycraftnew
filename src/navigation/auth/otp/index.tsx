
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useDispatch } from 'react-redux';
import styles from './styles';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../services/axiousinstance';
import { API_ENDPOINTS } from '../../../services/endpoints';
import { AuthStackParamList } from '../../types';
import { login } from '../../../redux/slice/auth';

const { width } = Dimensions.get('window');

const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<AuthStackParamList, 'Otp'>>();
  const { mobile, otp: backendOtp } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const otpValue = otp.join('');

  useEffect(() => {
    if (backendOtp) {
      Toast.show({
        type: 'success',
        text1: `Your OTP is 🎉 : ${backendOtp}`,
        position: 'top',
        visibilityTime: 6000,
      });
    }

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const onlyNum = text.replace(/[^0-9]/g, '').slice(-1);
    const updatedOtp = [...otp];
    updatedOtp[index] = onlyNum;
    setOtp(updatedOtp);

    if (onlyNum !== '' && index < 5) inputs.current[index + 1]?.focus();
    if (onlyNum === '' && index > 0) inputs.current[index - 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {

    if (e.nativeEvent.key === 'Backspace') {
      const updated = [...otp];

      if (updated[index] !== '') {
        updated[index] = '';
        setOtp(updated);
        return;
      }

      if (index > 0) {
        updated[index - 1] = '';
        setOtp(updated);
        inputs.current[index - 1]?.focus();
      }
    }

  };

  const clearOtp = () => {
    setOtp(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
  };

  const handleResend = () => {
    clearOtp();
    setTimer(60);
    Alert.alert('OTP Sent', `A new OTP has been sent to +91${mobile}`);
  };

  const handleVerify = async () => {
    if (otpValue.length < 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.VERIFY_OTP, {
        phone_number: mobile,
        otp_code: otpValue,
      });

      const data = response.data;
      console.log('verify otp:>>>>>>>', response.data);

      if (data?.status) {
        const { accessToken, user } = data.data;

        await AsyncStorage.setItem('token', accessToken);
         await AsyncStorage.setItem('is_register', JSON.stringify(user?.is_register));
           await AsyncStorage.setItem('user_phone', mobile);

dispatch(
    login({
      token: accessToken,
      user: user,
    })
  );

        Toast.show({
          type: 'success',
           text1: data?.message || 'OTP Verified Successfully!',
          });


        if (user?.is_register) {
              navigation.navigate('MainTabs');
        } else {
          navigation.navigate('ChooseLanguage');
        }

      } else {
        const backendError = data?.message || 'OTP verification failed';
        setError(backendError);


        Toast.show({
          type: 'error',
          text1: backendError,
        });

      }
    } catch (err: any) {

      console.log('OTP Verify Error:', err.response || err.message);

      Toast.show({
        type: 'error',
        text1: 'OTP Verification Failed',
        text2: err.message,
      });

    } finally {
      setLoading(false);
    }

  };

  const isButtonDisabled = otpValue.length < 6 || loading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../../../assets/images/wavyheader.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={width * 0.07} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Text style={styles.title}>Welcome to the Creative Circle! 🤝</Text>
          <Text style={styles.subtitle}>
            Enter the <Text style={{ color: '#fff', fontWeight: '600' }}>OTP</Text> to confirm your spot in the DailyCraft community
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[styles.otpBox, error ? { borderColor: 'red' } : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.resendText}>
        Didn’t receive code?{' '}
        <Text style={[styles.resendLink, timer > 0 ? { opacity: 0.6 } : null]} onPress={() => timer === 0 && handleResend()}>
          {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
        </Text>
      </Text>

      <TouchableOpacity
        style={[styles.verifyButton, isButtonDisabled && { opacity: 0.6 }]}
        onPress={handleVerify}
        disabled={isButtonDisabled}
      >
        <Text style={styles.verifyButtonText}>{loading ? 'Verifying...' : 'Verify & Proceed'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;
