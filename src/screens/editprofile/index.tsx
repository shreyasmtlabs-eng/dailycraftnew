

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
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

type EditProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
};

const EditProfile = ({ navigation }: EditProfileProps) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [_profiletype, setProfileType] = useState('');

  const activeProfileId = useSelector((state: RootState) => state.profile.activeProfileId);
console.log('Redux activeProfileId in EditProfile:', activeProfileId);

  const fetchProfileDetails = async (profileId?: string) => {
    try {
      const id = profileId || activeProfileId;
      if (!id) return;

      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_DETAILS}${id}`);

      console.log('get details in edit screen:>>>>>', response.data);

      if (response.data?.status && response.data.data) {
        const data = response.data.data;

        setProfileType(data.profile_type || '');
        setProfileData(data);
        setEmail(data.email || '');
        setName(data.name || '');
        setContact(data.mobile || '');
        setBio(data.bio || '');
        setAddress(data.address || '');
        setSelectedImage(data.avatar || null);
      }
    } catch (error) {
      console.log('Error fetching profile details:', error);
    } finally {
      setLoading(false);
    }
  };

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
      const profile_id = activeProfileId;

      console.log('Profile ID:>>>>>>>>', profile_id);

      if (!profile_id) {
        Alert.alert('Error', 'Profile not found');
        return;
      }

      const formData = new FormData();
      formData.append('profile_id', profile_id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', contact);
      formData.append('bio', bio);
      formData.append('address', address || '');
      formData.append('profile_type', _profiletype);

      if (selectedImage && !selectedImage.startsWith('http')) {
        formData.append('avatar', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: `avatar_${Date.now()}.jpg`,
        } as any);
      }

      setLoading(true);

      const response = await axiosInstance.post(API_ENDPOINTS.UPDATE_PROFILE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Update profile api response:>>>>>>', response.data);

      if (response.data?.status) {
        Alert.alert('Success', 'Profile updated successfully');
        setProfileData({
          ...profileData,
          name,
          email,
          mobile: contact,
          bio,
          address,
          avatar: selectedImage || profileData.avatar,
        });
          console.log('Using activeProfileId:', activeProfileId);
      } else {
        Alert.alert('Error', response.data?.message || 'Update failed');
      }
    } catch (error) {
      console.log('Update Profile Error:', error);
      Alert.alert('Error', 'Something went wrong');
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
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

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
            <Text style={styles.label}>Shop/ Business Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter Name"
              placeholderTextColor="#777"
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

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter Here"
              placeholderTextColor="#777"
            />
          </View>

          <View style={styles.bottomContainer}>
            <Button title="Continue" onPress={handleUpdateProfile} />
          </View>

          <TouchableOpacity
            style={styles.switchContainer}
            onPress={() => navigation.navigate('PersonalProfile')}
          >
            <Text style={styles.switchText}>
              Switch to <Text style={styles.switchHighlight}>Personal Profile</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default EditProfile;
