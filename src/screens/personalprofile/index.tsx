import React, { useState} from 'react';
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
import ImagePicker from 'react-native-image-crop-picker';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../redux/store';
import { useDispatch,useSelector } from 'react-redux';
import { setIsRegister } from '../../redux/slice/profile';
// import { updateUser } from '../../redux/slice/auth';
import axiosInstance from '../../services/axiousinstance';
import { API_ENDPOINTS } from '../../services/endpoints';
import Toast from 'react-native-toast-message';
type Props = NativeStackScreenProps<RootStackParamList, 'PersonalProfile'>;

const PersonalProfile: React.FC<Props> = ({ navigation }) => {
   const userId = useSelector((state: RootState) => state.auth.user?.id);
   const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    bio: '',
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
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        const imageUri = image.path.startsWith('file://')
          ? image.path
          : `file://${image.path}`;
        setSelectedImage(imageUri);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {console.warn(error);}
      });
  };

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        const imageUri = image.path.startsWith('file://')
          ? image.path
          : `file://${image.path}`;
        setSelectedImage(imageUri);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {console.warn(error);}
      });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = {
       name: '',
       email: '',
       contact: '',
       bio: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
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

    setErrors(newErrors);
    return valid;
  };

  const handleCreateProfile = async() => {
    if (!validateFields()) {return;}

    setLoading(true);


    try{
      const formData = new FormData();
formData.append('name',name.trim());
formData.append('email',email.trim());
formData.append('mobile', contact.trim());
formData.append('bio',bio.trim());
formData.append('profile_type','personal');

//  const user_id = await AsyncStorage.getItem('user_id');
//     formData.append('user_id', user_id || '');

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
  { headers  : {'Content-Type':'multipart/form-data'}}
);

const data = response.data;
console.log('create profile response>>>>>>',data);

if(data?.status){
  Toast.show({
          type: 'success',
          text1: data.message || 'Profile created successfully',
        });

//  await AsyncStorage.setItem('is_register', 'true');
 console.log('Dispatching setIsRegister(true)');

 dispatch(setIsRegister(true));
// dispatch(
//     updateUser({
//       is_register: true,
//     })
  // );
 navigation.navigate('MainTabs');
    } else {
      Toast.show({
        type: 'error',
        text1: data?.message || 'Something went wrong',
      });
    }

  } catch (err: any) {
    console.log('create profile error >>>>', err.response, err.message);

    Toast.show({
      type: 'error',
      text1: err.response?.data?.message || 'Error',
      text2: 'Failed to create profile',
    });

  } finally {
    setLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>


          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF"/>
            </TouchableOpacity>
            <Text style={styles.headerText}>Personal Profile</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

            <TouchableOpacity style={styles.logoBox} activeOpacity={0.9} onPress={openPickerSheet}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="cover" />
              ) : (
                <View style={styles.emptyBox}>
                  <Image
                    source={require('../../assets/images/uploadicon.png')}
                    style={styles.uploadimageicon}
                  />
                  <Text style={styles.logoText}>Please Upload {'\n'}A Profile Picture</Text>
                  <View style={styles.pickButtons}>
                    <TouchableOpacity style={styles.pickBtn} onPress={openPickerSheet}>
                      <Ionicons name="image-outline" size={22} color="#FFF" />
                      <Text style={styles.pickTxt}>Upload Logo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>

            <Modal visible={pickerVisible} transparent animationType="fade" onRequestClose={closePickerSheet}>
              <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
                activeOpacity={1}
                onPress={closePickerSheet}
              >
                <Animated.View
                  style={{
                    backgroundColor: '#fff',
                    paddingTop: 15,
                    paddingBottom: 30,
                    paddingHorizontal: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    transform: [{ translateY: sheetTranslateY }],
                  }}
                >
                  <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', marginBottom: 15 }}>
                    Select Image
                  </Text>

                  <TouchableOpacity
                    style={styles.sheetBtn}
                    onPress={() => {
                      closePickerSheet();
                      handleCameraPick();
                    }}
                  >
                    <Ionicons name="camera-outline" size={22} color="#000" />
                    <Text style={styles.sheetBtnText}>Open Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sheetBtn}
                    onPress={() => {
                      closePickerSheet();
                      handleImagePick();
                    }}
                  >
                    <Ionicons name="images-outline" size={22} color="#000" />
                    <Text style={styles.sheetBtnText}>Choose From Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={closePickerSheet} style={styles.sheetCancelBtn}>
                    <Text style={styles.sheetCancelText}>Cancel</Text>
                  </TouchableOpacity>
                </Animated.View>
              </TouchableOpacity>
            </Modal>


            <Text style={styles.label}>Enter Name</Text>
            <TextInput
              style={[styles.input, errors.name && { borderColor: 'red' }]}
              value={name}
              onChangeText={t => setName(t.replace(/\s+/g, ' '))}
            />
            {!!errors.name && <Text style={styles.errorText}>{errors.name}*</Text>}

            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              style={[styles.input, errors.email && { borderColor: 'red' }]}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={t => setEmail(t.trim())}
            />
            {!!errors.email && <Text style={styles.errorText}>{errors.email}*</Text>}

             <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={[styles.input, errors.contact && { borderColor: 'red' }]}
              keyboardType="numeric"
              maxLength={10}
              value={contact}
              onChangeText={t => setContact(t.replace(/[^0-9]/g, ''))}
            />
            {!!errors.contact && <Text style={styles.errorText}>{errors.contact}*</Text>}



            <Text style={styles.label}>Describe Yourself Briefly</Text>
            <TextInput
              style={[styles.input, styles.textlarge, errors.bio && { borderColor: 'red' }]}
              multiline
              value={bio}
              onChangeText={t => setBio(t.replace(/\s{2,}/g, ' '))}
            />
            {!!errors.bio && <Text style={styles.errorText}>{errors.bio}*</Text>}

            <View style={styles.bottomContainer}>
              <Button title={loading ? 'Please wait...' : 'Continue'} onPress={handleCreateProfile} />
            </View>

            <TouchableOpacity style={styles.switchBtn} onPress={() => navigation.navigate('BusinessProfile')}>
              <Text style={styles.switchText}>
                Switch to <Text style={styles.switchtext2}>Business Profile</Text>
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalProfile;
