
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import Button from '../../component/button';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_ENDPOINTS } from '../../services/endpoints';
import axiosInstance from '../../services/axiousinstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Toast from 'react-native-toast-message';

type EditProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
};

const EditProfile = ({ navigation }: EditProfileProps) => {
  // const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [_profiletype, setProfileType] = useState<'personal' | 'business'>(
    'personal'
  );

  const activeProfileId = useSelector(
    (state: RootState) => state.profile.activeProfileId
  );
  console.log('Redux activeProfileId in EditProfile:', activeProfileId);


  const isBusiness = _profiletype === 'business';

  const fetchProfileDetails = async () => {
    try {
      setLoading(true);
      setNetworkError(false);

      if (!activeProfileId) return;

      const response = await axiosInstance.get(
        `${API_ENDPOINTS.GET_DETAILS}${activeProfileId}`
      );

      if (response.data?.status && response.data.data) {
        const data = response.data.data;

        setProfileType(data.profile_type);
        setName(data.name || '');
        setEmail(data.email || '');
        setContact(data.mobile || '');
        setBio(data.bio || '');
        setAddress(data.address || '');
        setSelectedImage(data.avatar || null);
      }
    } catch (error: any) {
      setNetworkError(true);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, [activeProfileId]);

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
       includeBase64: true,
    })
      .then(image => setSelectedImage(image.path))
       .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.warn('Image Picker Error:', error);
        }
      });

  };

    useEffect(() => {
    fetchProfileDetails();
  }, [activeProfileId]);


  const handleUpdateProfile = async () => {
    try {
      if (!activeProfileId) return;

      setLoading(true);

      const formData = new FormData();
      formData.append('profile_id', activeProfileId);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', contact);
      formData.append('bio', bio);
      formData.append('profile_type', _profiletype);

      if (isBusiness) {
        formData.append('address', address || '');
      }

      // if (selectedImage && !selectedImage.startsWith('http')) {
      //   formData.append('avatar', {
      //     uri: selectedImage,
      //     type: 'image/jpeg',
      //     name: `avatar_${Date.now()}.jpg`,
      //   } as any);
      // }

if (selectedImage) {
  if (selectedImage.startsWith('http')) {
    formData.append('avatar', selectedImage);
  } else {
    formData.append('avatar', {
      uri: selectedImage,
      type: 'image/jpeg',
      name: `avatar_${Date.now()}.jpg`,
    } as any);
  }
}


      const response = await axiosInstance.post(
        API_ENDPOINTS.UPDATE_PROFILE,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
        });
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homebackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity  style={styles.backBtn}  onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>


      {networkError && !loading && (
            <Text style={{ textAlign: 'center', color: '#fff', marginVertical: 20 }}>
              Please check your internet connection
            </Text>
          )}


            <View style={styles.logoContainer}>
            <TouchableOpacity style={styles.logoBox} onPress={handleImagePick} activeOpacity={0.8}>
             {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.logoImage} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={30} color="#000000" />
                  <Text style={styles.uploadText}>Please Upload  A Business Logo</Text>
                  <TouchableOpacity style={styles.uploadBtn} onPress={handleImagePick}>
                    <Ionicons name="image-outline" size={20} color="#fff" />
                    <Text style={styles.uploadBtnText}>Upload Logo</Text>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
</View>

          <View style={styles.formContainer}>

            <Text style={styles.label}>
              {isBusiness ? 'Shop / Business Name' : 'Enter Name'}
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={
                isBusiness
                  ? 'Enter shop / business name'
                  : 'Enter your name'
              }
            />

            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
                placeholder="Enter Here"
              placeholderTextColor="#777"

            />

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              value={contact}
              onChangeText={setContact}
                placeholder="Enter Contact"
              placeholderTextColor="#777"

            />

            <Text style={styles.label}>Describe Yourself Briefly</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
               placeholder="Type Here"
              multiline
               placeholderTextColor="#777"
            />


            {isBusiness && (
              <>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={address}
                  onChangeText={setAddress}
                    placeholder="Enter Here"
              placeholderTextColor="#777"

                />
              </>
            )}
          </View>

          <View style={styles.bottomContainer}>
            <Button title="Continue" onPress={handleUpdateProfile} />
          </View>


          <TouchableOpacity
            style={styles.switchContainer}
            onPress={() =>
              navigation.navigate(
                isBusiness ? 'PersonalProfile' : 'BusinessProfile'
              )
            }
          >
            <Text style={styles.switchText}>
              Switch to{' '}
              <Text style={styles.switchHighlight}>
                {isBusiness ? 'Personal Profile' : 'Business Profile'}
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default EditProfile;
