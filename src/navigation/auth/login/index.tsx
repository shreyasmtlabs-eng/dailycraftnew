

import React, { useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import CountryPicker from 'react-native-country-picker-modal';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../component/custombutton/customButton';
import styles from './styles';
import { deviceWidth } from '../../../utils/dimensions';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../../services/axiousinstance';
import { API_ENDPOINTS } from '../../../services/endpoints';

type CountryCode = string;
const indianMobileRegex = /^(?!.*(\d)\1{9})[6-9]\d{9}$/;

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [checked, setChecked] = useState(false);
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState<string>('91');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = indianMobileRegex.test(mobile) && checked;




  const handleMobileChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 10) setMobile(numericText);

    if (numericText.length === 10 && !indianMobileRegex.test(numericText)) {
      setError('Please enter a valid Indian mobile number');
    } else {
      setError('');
    }
  };

  const handleGetOTP = async () => {
    if (!mobile.trim()) {
      setError('Please enter mobile number');
      return;
    }
    if (!indianMobileRegex.test(mobile)) {
      setError('Please enter a valid Indian mobile number');
      return;
    }
    if (!checked) {
      setError('Please accept Terms & Conditions');
      return;
    }

    setLoading(true);
    setError('');


    try {
      const response = await axiosInstance.post(API_ENDPOINTS.SEND_OTP, { phone_number: mobile });
      const data = response.data;
      console.log('login response>>>>>:',response.data);

      if (data?.status) {
        Toast.show({
          type: 'success',
          text1: data.message || 'OTP sent successfully',
        });

        navigation.navigate('Otp', { mobile, otp: data.otp });
      } else {

        Toast.show({
          type: 'error',
          text1: data?.message || 'Something went wrong',
        });

      }

    } catch (err: any) {

      console.log('Send OTP Error:', err.response || err.message);

      Toast.show({
         type: 'error',
         text1: err.response?.data?.message || 'Something went wrong',
        });

    } finally {
      setLoading(false);
    }
  };

  return (

    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <StatusBar backgroundColor="#FF984F" barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <ImageBackground
                source={require('../../../assets/images/wavyheader.png')}
                style={styles.headerBackground}
                resizeMode="cover"
              >
                <View style={styles.banner}>
                  <Text style={styles.title}>Join the DailyCraft Community! 🤝</Text>
                  <Text style={styles.subtitle}>
                    Log in to Explore, Download & Inspire with Creative Posters.
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.inputSection}>
                <Text style={styles.label}>Mobile Number</Text>

                <View style={[styles.inputBox, error ? styles.errorBorder : null]}>
                  <TouchableOpacity onPress={() => setVisible(true)} style={styles.countryPickerContainer}>
                    <CountryPicker
                      countryCode={countryCode}
                      withFilter
                      withFlag
                      withCallingCode
                      withModal
                      visible={visible}
                      onClose={() => setVisible(false)}
                      onSelect={(country) => {
                        setCountryCode(country.cca2);
                        setCallingCode(country.callingCode[0]);
                      }}
                    />
                    <Text style={styles.countryCode}>+{callingCode}</Text>
                  </TouchableOpacity>

                  <View style={styles.separatorLine} />

                  <TextInput
                    value={mobile}
                    onChangeText={handleMobileChange}
                    placeholder="Enter 10 digit number"
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={10}
                  />

                  <TouchableOpacity>
                    <Image
                      source={require('../../../assets/images/callicon.png')}
                      style={styles.callIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                {error !== '' && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.helperText}>
                  You will receive an SMS verification that may apply{'\n'}message and data rates.
                </Text>
              </View>

              <View style={styles.bottomContainer}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() => setChecked(!checked)}
                    style={[styles.checkbox, { backgroundColor: checked ? '#FF8C32' : '#FFFFFF' }]}
                  >
                    {checked && (
                      <Ionicons name="checkmark-sharp" size={deviceWidth * 0.05} color="#FFF" />
                    )}
                  </TouchableOpacity>

                  <Text style={styles.checkboxLabel}>
                    <Text style={styles.link}> I accept the Terms & Conditions</Text> and{' '}
                    <Text style={styles.link}>Privacy Policy.</Text>
                  </Text>
                </View>

                <Button title={loading ? 'Sending...' : 'Get OTP'} disabled={!isFormValid || loading} onPress={handleGetOTP} />

                <TouchableOpacity>
                  <Text style={styles.privacyText}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
