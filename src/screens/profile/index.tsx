
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator, Alert, Modal,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { clearProfile } from '../../redux/slice/profile';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_ENDPOINTS } from '../../services/endpoints';
import axiosInstance, { clearAuthHeader } from '../../services/axiousinstance';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/auth';
import { RootState } from '../../redux/store';
import { CommonActions } from '@react-navigation/native';
import { setActiveProfile } from '../../redux/slice/profile';

type ProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const Profile = ({ navigation }: ProfileProps) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [deletemodalvisible, setDeleteModalVisible] = useState(false);
  const dispatch = useDispatch();

  const isPremium = useSelector((state: RootState) => state.membership.isPremium);
  const activeProfileId = useSelector((state: RootState) => state.profile.activeProfileId);

  const token = useSelector((state: RootState) => state.auth.token);
  const profileState = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    console.log('token on profilescreen:', token);
    console.log('profile state:', profileState);
  }, [token, profileState]);

  const fetchProfileDetails = async (profileId?: string) => {
    setLoading(true);
    setNetworkError(false);

    try {
      const id = profileId || activeProfileId;
      if (!id) {
        return;
      }
      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_DETAILS}${id}`);

      console.log('get profiles details on profiles:>>>>>', response.data);

      if (response.data?.status && response.data.data) {
        setProfileData(response.data.data);
      } else {
        setProfileData(null);
      }
    } catch (error: any) {
      console.log('Error fetching profile details:>>>>>>>', error);
      const msg = error?.message?.toLowerCase?.() || '';
      if (msg.includes('network') || error?.code === 'ERR_NETWORK' || !error?.response) {
        setNetworkError(true);
      }
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProfiles = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PROFILES);

      if (response.data?.status && Array.isArray(response.data.data)) {
        console.log('ALL PROFILES2:>>>>>', response.data.data);

        const sortedProfiles = [...response.data.data].sort((a, b) => {
          return (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0);
        });

        setAllProfiles(sortedProfiles);
      } else {
        setAllProfiles([]);
      }
    } catch (err) {
      setAllProfiles([]);
      console.log('Error fetching profiles:', err);
    }
  };



  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteProfile = (profileId: string, isPrimary: boolean) => {

    if (isPrimary) {
      Alert.alert(
        'Cannot Delete',
        'This is your primary profile and cannot be deleted. Primary profile is created when you first sign up.',
        [{ text: 'OK' }]
      );
      setDeleteModalVisible(false);
      return;
    }

    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete this profile?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const response = await axiosInstance.delete(
                `${API_ENDPOINTS.DELETE_PROFILE}${profileId}`
              );

              if (response.data?.status) {
                Toast.show({
                   type: 'success',
                  text1: 'Profile deleted successfully',
                });

                const profilesRes = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PROFILES);
                const profiles = profilesRes.data?.data || [];

                const sortedProfiles = [...profiles].sort((a, b) => {
                  return (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0);
                });

                setAllProfiles(sortedProfiles);

                if (sortedProfiles.length > 0) {
                  const primaryProfile = sortedProfiles.find(p => p.is_primary) || sortedProfiles[0];

                  dispatch(setActiveProfile(primaryProfile.id.toString()));
                  await fetchProfileDetails(primaryProfile.id.toString());
                } else {
                  dispatch(clearProfile());
                }
              } else {
                throw new Error('Delete failed');
              }
            } catch (err) {
              console.log('Delete error:', err);
              Toast.show({ type: 'error', text1: 'Failed to delete profile' });
            } finally {
              setLoading(false);
              setDeleteModalVisible(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchProfileDetails();
    fetchAllProfiles();

    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      fetchProfileDetails();
      fetchAllProfiles();
    });

    return unsubscribe;
  }, [navigation, activeProfileId]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    clearAuthHeader();

    Toast.show({
      type: 'success',
      text1: 'Successfully logged out',
      position: 'top',
    });

    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    }));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homebackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Profile Details</Text>
          </View>

          <Modal
            visible={deletemodalvisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setDeleteModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Profile to Delete</Text>
                <Text style={{ fontSize: 12, color: '#666', marginBottom: 15, textAlign: 'center' }}>
                  Primary profile cannot be deleted
                </Text>

                <ScrollView>
                  {allProfiles.map((profile) => (
                    <TouchableOpacity
                      key={profile.id}
                      style={[
                        styles.profileRow,
                        profile.is_primary && { },
                      ]}
                      onPress={() => handleDeleteProfile(profile.id, profile.is_primary)}
                      disabled={profile.is_primary}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Image
                          source={profile.avatar ? { uri: profile.avatar } : require('../../assets/images/shubhamicon.png')}
                          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.profilesName}>{profile.name}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            {profile.is_primary && (
                              <Text style={{ fontSize: 14, color: 'black', marginRight: 8 }}>
                                Primary
                              </Text>
                            )}
                            <Text style={{
                              fontSize: 12,color: profile.profile_type === 'business' ? '#252525' : '#252525',fontWeight: '600'}}>
                              {profile.profile_type || 'Personal'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {profile.is_primary ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                         {/* <Ionicons name="lock-closed" size={18} color="#999" /> */}
                          {/* <Text style={{ fontSize: 12, color: '#999', marginLeft: 4 }}>Locked</Text> */}
                        </View>
                      ) : (
                        <Ionicons name="trash" size={20} color="#ff914d" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.profileCard}>
            {loading && !networkError ? (
              <ActivityIndicator size="large" color="#ff914d" />
            ) : networkError ? (
              <Text style={{ textAlign: 'center', color: '#fff', marginVertical: 20 }}>
                Please check your internet connection
              </Text>
            ) : (
              <>
                <Image
                  source={
                    profileData?.avatar
                      ? { uri: profileData.avatar }
                      : require('../../assets/images/shubhamicon.png')
                  }
                  style={styles.profileImage}
                />

                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profileData?.name || 'User'}</Text>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{profileData?.profile_type || 'Personal'}</Text>
                  </View>
                  {profileData?.is_primary && (
                    <View style={{
                      flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4,
                    borderRadius: 6,marginTop: 4, alignSelf: 'flex-start'}}>
{/*
                      <Ionicons name="star" size={12} color="#000" /> */}
                      <Text style={{ color: '#000', fontSize: 11, fontWeight: '600', marginLeft: 4 }}>
                        Primary Profile
                      </Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <Text style={styles.editText}>Edit Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {!isPremium && !networkError && (
            <View style={styles.premiumCard}>
              <View style={styles.premiumLeft}>
                <Image
                  source={require('../../assets/images/premiumicon.png')}
                  style={styles.premiumIcon}
                />
                <View>
                  <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                  <Text style={styles.premiumSubtitle}>
                    Download faster, ad-free,{'\n'}and in HD quality
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => navigation.navigate('SubscriptionModal')}
              >
                <Text style={styles.upgradeText}>Upgrade Now</Text>
              </TouchableOpacity>
            </View>
          )}

          {!networkError && (
            <>
              <View style={styles.sectionOuter}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Settings</Text>

                  <TouchableOpacity style={styles.optionRow}>
                    <View style={styles.optionLeft}>
                      <Image
                        source={require('../../assets/images/updatapp.png')}
                        style={styles.optionIcon}
                      />
                      <Text style={styles.optionText}>App Update</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity style={styles.optionRow} onPress={handleDelete}>
                    <View style={styles.optionLeft}>
                      <Image
                        source={require('../../assets/images/accdelete.png')}
                        style={styles.optionIcon}
                      />
                      <Text style={styles.optionText}>Delete Profile</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.sectionOuter}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Help & Support</Text>

                  <TouchableOpacity style={styles.optionRow}>
                    <View style={styles.optionLeft}>
                      <Image source={require('../../assets/images/faq.png')} style={styles.optionIcon} />
                      <Text style={styles.optionText}>FAQ</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity style={styles.optionRow}>
                    <View style={styles.optionLeft}>
                      <Image
                        source={require('../../assets/images/callicon.png')}
                        style={styles.optionIcon}
                      />
                      <Text style={styles.optionText}>Call us</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  <TouchableOpacity style={styles.optionRow}>
                    <View style={styles.optionLeft}>
                      <Image
                        source={require('../../assets/images/whatsappicon.png')}
                        style={styles.optionIcon}
                      />
                      <Text style={styles.optionText}>Whatsapp Support</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footerGrid}>
                <TouchableOpacity style={styles.footerButton}>
                  <Text style={styles.footerText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                  <Text style={styles.footerText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                  <Text style={styles.footerText}>Terms & Condition</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
                  <Text style={styles.footerText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
