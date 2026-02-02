import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Animated,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import Button from '../../component/button';
import ImageCropPicker from 'react-native-image-crop-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import axiosInstance from '../../services/axiousinstance';
import { API_ENDPOINTS } from '../../services/endpoints';
import Toast from 'react-native-toast-message';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsRegister } from '../../redux/slice/profile';

type BusinessProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BusinessProfile'>;
};

const BusinessProfile = ({ navigation }: BusinessProfileProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [networkError, setNetworkError] = useState(false);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    shopName: '',
    email: '',
    contact: '',
    bio: '',
    address: '',
  });

  const slideAnim = useState(new Animated.Value(0))[0];

  const openPickerSheet = () => {
    setPickerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closePickerSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setPickerVisible(false));
  };

  const sheetTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const handleCameraPick = () => {
    ImageCropPicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        const imageUri = image.path.startsWith('file://')
          ? image.path
          : `file://${image.path}`;
        setSelectedImage(imageUri);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.warn('Camera Error:', error);
        }
      });
  };

  const handleImagePick = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.warn('Image Picker Error:', error);
        }
      });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      shopName: '',
      email: '',
      contact: '',
      bio: '',
      address: '',
    };

    if (!shopName.trim()) {
      newErrors.shopName = 'Business name is required';
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/@gmail\.com$/.test(email.trim().toLowerCase())) {
      newErrors.email = 'Email must include @gmail.com';
      valid = false;
    }
    if (!/^\d{10}$/.test(contact.trim())) {
      newErrors.contact = 'Enter valid 10-digit number';
      valid = false;
    }
    if (!bio.trim()) {
      newErrors.bio = 'Bio cannot be empty';
      valid = false;
    }
    if (!address.trim()) {
      newErrors.address = 'Address cannot be empty';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handleCreateProfile = async() => {
    if (!validateFields()) {return;}

    setLoading(true);
      setNetworkError(false);

    try{
      const formData = new FormData();
      formData.append('profile_type','business');
      formData.append('name',shopName.trim());
      formData.append('email',email.trim());
      formData.append('mobile',contact.trim());
      formData.append('bio',bio.trim());
      formData.append('address',address.trim());



formData.append('user_id', userId || '');

              if(selectedImage){
                formData.append('avatar',{
                      uri:selectedImage,
    type:'image/jpeg',
    name:'avatar.jpg',
                } as any);

    }

    const response = await axiosInstance.post(API_ENDPOINTS.CREATE_PROFILE,
      formData,
      { headers : {'Content-Type' : 'multipart/form-data'}},
    );


    const data = response.data;
    console.log('create Bussiness profile response>>>>>>>',data);

    if(data?.status){
      Toast.show({
              type: 'success',
              text1: data.message || 'Profile created successfully',
            });


  const profilesResponse = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PROFILES);
  const allProfiles = profilesResponse.data?.data || [];

  if (allProfiles.length === 1) {
    try {
      await axiosInstance.post(API_ENDPOINTS.MAKE_PRIMARY, {
        profile_id: data.data.id,
      });
      console.log('First profile automatically set as primary');
    } catch (error) {
      console.log('Error making profile primary:', error);
    }
  }


  console.log('Dispatching setIsRegister(true)');
  dispatch(setIsRegister(true));


            navigation.navigate('MainTabs');
                } else {
                  Toast.show({
                    type: 'error',
                    text1: data?.message || 'Something went wrong',
                  });
                }

              } catch (err: any) {
                console.log('create profile error >>>>', err.response, err.message);

 if (!err.response || err.code === 'ERR_NETWORK') {
      setNetworkError(true);
    } else {
                 Toast.show({
                      type: 'error',
                      text1: err.response?.data?.message || 'Error',
                      text2: 'Failed to create profile',
                    });
                  }
                  } finally {
                    setLoading(false);
                  }
                };


const toTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>



          <View style={styles.header}>
            {networkError && (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    }}
  >
    <Ionicons name="wifi-outline" size={80} color="#FF8C32" />
    <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 12 }}>
      Network Issue
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginVertical: 10,
      }}
    >
      Please check your internet connection and try again.
    </Text>

    <Button
      title="Retry"
      onPress={handleCreateProfile}
    />
  </View>
)}

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Business Profile</Text>
          </View>
{!networkError && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}>


            <TouchableOpacity
              style={styles.logoBox}
              activeOpacity={0.9}
              onPress={openPickerSheet}>

              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.emptyBox}>
                  <Image
                    source={require('../../assets/images/uploadicons.png')}
                    style={styles.uploadimageicon}
                    resizeMode="contain"
                  />
                  <Text style={styles.logoText}>Please Upload{'\n'}A Profile Picture</Text>

                  <View style={styles.pickButtons}>
                    <TouchableOpacity
                      style={styles.pickBtn}
                      onPress={openPickerSheet}>
                      <Ionicons name="image-outline" size={22} color="#FFF" />
                      <Text style={styles.pickTxt}>Upload Logo</Text>
                    </TouchableOpacity>
                  </View>

                  <Modal
                    visible={pickerVisible}
                    transparent
                    animationType="fade"
                    statusBarTranslucent
                    onRequestClose={closePickerSheet}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={closePickerSheet}
                      style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'flex-end',
                      }}>
                      <Animated.View
                        style={{
                          backgroundColor: '#fff',
                          paddingTop: 15,
                          // paddingBottom: 30,
                          paddingHorizontal: 20,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          transform: [{ translateY: sheetTranslateY }],
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: '600',
                            marginBottom: 20,
                          }}>
                          Select Image
                        </Text>

                        <TouchableOpacity
                          style={styles.bottomSheetBtn}
                          onPress={() => {
                            closePickerSheet();
                            handleCameraPick();
                          }}>
                          <Ionicons name="camera-outline" size={26} color="#000" />
                          <Text style={{ marginLeft: 10, fontSize: 19}}>
                            Open Camera
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.bottomSheetBtn}
                          onPress={() => {
                            closePickerSheet();
                            handleImagePick();
                          }}>
                          <Ionicons name="images-outline" size={26} color="#000" />
                          <Text style={{ marginLeft: 10, fontSize: 19 }}>
                            Choose From Gallery
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={closePickerSheet}
                          style={styles.bottomSheetCancel}>
                          {/* <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>
                            Cancel
                          </Text> */}
                        </TouchableOpacity>
                      </Animated.View>
                    </TouchableOpacity>
                  </Modal>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Shop / Business Name</Text>
            <TextInput
              style={[styles.input, errors.shopName ? { borderColor: 'red' } : null]}
              value={shopName}
              onChangeText={text => setShopName(text.replace(/\s+/g, ' '))}
onEndEditing={() => setShopName(toTitleCase(shopName))}
  autoCapitalize="words"
            />
            {errors.shopName ? (
              <Text style={styles.error}>{errors.shopName}*</Text>
            ) : null}

            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              style={[styles.input, errors.email ? { borderColor: 'red' } : null]}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text.trim())}
            />
            {errors.email ? <Text style={styles.error}>{errors.email}*</Text> : null}

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={[styles.input, errors.contact ? { borderColor: 'red' } : null]}
              keyboardType="numeric"
              maxLength={10}
              value={contact}
              onChangeText={text => setContact(text.replace(/[^0-9]/g, ''))}
            />
            {errors.contact ? <Text style={styles.error}>{errors.contact}*</Text> : null}

            <Text style={styles.label}>Describe Your Business</Text>
            <TextInput
              style={[styles.input, styles.textlarge, errors.bio ? { borderColor: 'red' } : null]}
              multiline
              value={bio}
              onChangeText={text => setBio(text.replace(/\s{2,}/g, ' ').slice(0, 300))}
            />
            {errors.bio ? <Text style={styles.error}>{errors.bio}*</Text> : null}

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textlarge, errors.address ? { borderColor: 'red' } : null]}
              multiline
              value={address}
              onChangeText={text => setAddress(text.replace(/\s{2,}/g, ' '))}
            />
            {errors.address ? <Text style={styles.error}>{errors.address}*</Text> : null}

            <View style={styles.bottomContainer}>
              <Button
                title={loading ? 'Please wait...' : 'Continue'}
                onPress={handleCreateProfile}
              />
            </View>

            <TouchableOpacity
              style={styles.switchBtn}
              onPress={() => navigation.navigate('PersonalProfile')}>
              <Text style={styles.switchText}>
                Switch to <Text style={styles.switchtext2}>Personal Profile</Text>
              </Text>
            </TouchableOpacity>

          </ScrollView>
          )}

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BusinessProfile;
