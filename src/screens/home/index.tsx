
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Buffer } from 'buffer';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import axiosInstance, { adminAxios } from '../../services/axiousinstance';
import { API_ENDPOINTS } from '../../services/endpoints';
import { downloadImage } from '../../component/Downloadhelper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveProfile } from '../../redux/slice/profile';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalProfile'>;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

type CategoryType = {
  id: string;
   category_name: string
   };

type ProfileItemType = {
   id: string;
    name?: string;
     avatar?: string;
      profile_type?: string
     };

type ProfileDataType = {
   id?: string;
  name?: string;
   avatar?: string
  };

type LoadTemplateType = {
   id: number;
    admin_id: number;
     template_name: string;
      file_path: string;
       created_at: string;
         category_id: number;
      };

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<any> | null>(null);
  const currentIndex = useRef(0);
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  // console.log('Redux token:', token);
  const activeProfileId = useSelector((state: RootState) => state.profile.activeProfileId);
  // console.log('Redux activeProfileId:', activeProfileId);
  const isPremium = useSelector((state: RootState) => state.membership.isPremium);

  const [networkError, setNetworkError] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [allProfiles, setAllProfiles] = useState<ProfileItemType[]>([]);
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const [Template, setTemplate] = useState<LoadTemplateType[]>([]);
  const [renderTemplate, setRenderTemplate] = useState<(LoadTemplateType & { image_url?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilesLoading, setProfilesLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleNetworkError = (error: any) => {
    if (!error?.response || error.code === 'ERR_NETWORK') setNetworkError(true);
  };
  const clearNetworkError = () => setNetworkError(false);

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => Buffer.from(buffer).toString('base64');

  const fetchCategories = async () => {
    try {
      const response = await adminAxios.get(API_ENDPOINTS.GET_ALL_CATEGORY);
      clearNetworkError();
      if (response.data?.status) setCategories(response.data.data || []);
    } catch (err) {
      handleNetworkError(err);
      console.log('Error fetching categories:', err);
    }
  };

const refreshTemplates =  React.useCallback(() => {
  if (!activeProfileId || Template.length === 0) return;

  currentIndex.current = 0;
  setLoadingIndex(null);


  setRenderTemplate(
    Template.map(t => ({ ...t, image_url: undefined }))
  );

  fetchTemplateData(Template[0].id, 0);
}, [activeProfileId, Template]);;


  const fetchAllProfiles = async () => {
    try {
      setProfilesLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PROFILES);
      clearNetworkError();

      if (response.data?.status && Array.isArray(response.data.data)) {
        setAllProfiles(response.data.data);
      } else {
        setAllProfiles([]);
      }
    } catch (err) {
      handleNetworkError(err);
      setAllProfiles([]);
      console.log('Error fetching profiles:', err);
    } finally {
      setProfilesLoading(false);
    }
  };




useEffect(() => {
  if (
    (activeProfileId === null || activeProfileId === undefined || activeProfileId === '') &&
    allProfiles.length > 0
  ) {
    dispatch(setActiveProfile(allProfiles[0].id.toString()));
  }
}, [allProfiles, activeProfileId]);


  const fetchProfileDetails = async (profileId?: string) => {
    const id = profileId || activeProfileId;
    if (!id) return;

    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_DETAILS}${id}`);
      clearNetworkError();
      if (response.data?.status && response.data.data) setProfileData(response.data.data);
    } catch (err) {
      handleNetworkError(err);
      console.log('Error fetching profile details:', err);
    }
  };

  const fetchAllTemplates = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.DOWNLOAD_TEMPLATE);
      if (response.data?.status && Array.isArray(response.data.data)) {
        setTemplate(response.data.data);
        setRenderTemplate(
          response.data.data.map((t: LoadTemplateType) => ({ ...t, image_url: undefined }))
        );
      }
    } catch (err) {
      console.log('Error fetchAllTemplates:', err);
    }
  };

  const fetchTemplateData = async (templateId?: number, index?: number) => {
    if (!templateId || typeof index !== 'number' || renderTemplate[index]?.image_url) return;

    setLoadingIndex(index);
    if (!activeProfileId) return;

    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.HOME_SCREEN_LOAD_TEMPLATE}?profile_id=${activeProfileId}&template_id=${templateId}`,
        { responseType: 'arraybuffer' }
      );

      const base64Image = arrayBufferToBase64(response.data);

      setRenderTemplate(prev => {
        const copy = [...prev];
        copy[index] = { ...copy[index], image_url: `data:image/png;base64,${base64Image}` };
        return copy;
      });
    } catch (err) {
      console.log('fetchTemplateData error:', err);
    } finally {
      setLoadingIndex(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchCategories();
      await fetchAllProfiles();
      await fetchAllTemplates();
      setLoading(false);
    };
    init();
  }, []);



useFocusEffect(
  React.useCallback(() => {
    if (!activeProfileId) return;
    fetchProfileDetails(activeProfileId);
    refreshTemplates();
       fetchAllProfiles();
  }, [activeProfileId, Template.length])
);



  const handleDownload = async () => {
    const currentTemplate = renderTemplate[currentIndex.current];
    if (!currentTemplate?.image_url) return 
    // Alert.alert('Error', 'Template image not available');

Toast.show({
type:'error',
text1:'Error',
text2:'Template image not available',
});

    downloadImage(currentTemplate.image_url);
  };

  const handleNext = () => {
    if (Template.length === 0) return;

    const nextIndex = (currentIndex.current + 1) % Template.length;

    try {
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } catch (err) {
      console.log('scrollToIndex error', err);
    }

    currentIndex.current = nextIndex;

    if (!renderTemplate[nextIndex]?.image_url && Template[nextIndex]?.id) {
      fetchTemplateData(Template[nextIndex].id, nextIndex);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/images/homebackground.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>

          <View style={styles.header}>
            <View style={styles.profileSection}>
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View style={styles.profileImageContainer}>
                  <Image
                    source={profileData?.avatar ? { uri: profileData.avatar } : require('../../assets/images/shubhamicon.png')}
                    style={styles.profileImg}
                  />
                </View>
              )}
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.userName}>{profileData?.name || 'User Name'}</Text>
                  <Ionicons name="chevron-down" size={18} color="#000" style={{ marginLeft: 4 }} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Image source={require('../../assets/images/crawn.png')} style={styles.crownIcon} />
              </View>
              <View style={styles.iconContainer2}>
                <Image source={require('../../assets/images/iconbell.png')} style={styles.headericon} />
              </View>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={25} color="#252525" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Posts, Reels, or GIFs..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                if (text.trim() === '') {
                  setRenderTemplate(Template.map(t => ({ ...t, image_url: undefined })));
                } else {
                  const filtered = Template.filter(t => t.template_name?.toLowerCase().includes(text.toLowerCase()));
                  setRenderTemplate(filtered.map(t => ({ ...t, image_url: undefined })));
                }
                currentIndex.current = 0;
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
              }}
            />
            <Image source={require('../../assets/images/filtericon.png')} style={{ width: 22, height: 22, tintColor: '#414141' }} />
          </View>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 8, marginBottom: 12 }}
            renderItem={({ item }) => {
              const isActive = activeCategory === item.id;
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{
                    backgroundColor: isActive ? '#FF7F32' : '#FFFFFF',
                    paddingHorizontal: 18,
                    height: 34,
                    borderRadius: 20,
                    marginRight: 8,
                    borderWidth: isActive ? 0 : 1,
                    borderColor: '#C5C5C5',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: isActive ? '#FFFFFF' : '#000000', fontSize: 12, fontWeight: '700' }}>
                    {item.category_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />


          {renderTemplate.length === 0 && loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={{ marginTop: 10, fontSize: 16 }}>Loading Template...</Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={Template}
              // pagingEnabled
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const imageUrl = renderTemplate[index]?.image_url;
                const isLoading = loadingIndex === index && !imageUrl;
                return (
                  <View style={{ height: SCREEN_HEIGHT }}>
                  {/* <View style={styles.templateContainer}> */}
                    {isLoading ? <ActivityIndicator size="large" /> : imageUrl ? <Image source={{ uri: imageUrl }} style={styles.templateImage} /> : <Text>No Template Available</Text>}
                  </View>
                );
              }}
              onMomentumScrollEnd={e => {
                const index = Math.round(e.nativeEvent.contentOffset.y / SCREEN_HEIGHT);
                currentIndex.current = index;
                if (!renderTemplate[index]?.image_url) fetchTemplateData(Template[index].id, index);
              }}
            />
          )}

          <View style={styles.fixedActionRow}>
            {!isPremium ? (
              <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: '#FF984F' }]} onPress={() => navigation.navigate('SubscriptionModal')}>
                <Text style={styles.downloadText}>Get Membership</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={isModalVisible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Profile</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {profilesLoading ? (
                  <ActivityIndicator size="large" color="#000" style={{ marginVertical: 20 }} />
                ) : allProfiles.length > 0 ? (
                  allProfiles.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.profileCard}
                      activeOpacity={0.8}
                      onPress={() => {
                        dispatch(setActiveProfile(item.id.toString()));
                        setModalVisible(false);
                      }}
                    >
                      <View style={styles.avatarBorderBox}>
                        <Image source={item.avatar ? { uri: item.avatar } : require('../../assets/images/shubhamicon.png')} style={styles.profileAvatar} />
                      </View>
                      <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{item.name || 'User'}</Text>
                        <View style={styles.profileTag}>
                          <Text style={styles.profileTagText}>{item.profile_type || 'Personal'}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          backgroundColor: profileData?.id === item.id ? '#FF7F32' : '#D9D9D9',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Ionicons name="checkmark" size={18} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={{ textAlign: 'center', color: '#999', marginTop: 15 }}>No profiles available</Text>
                )}
              </ScrollView>

              <TouchableOpacity
                style={styles.createProfileBtn}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('ChooseProfileType');
                }}
              >
                <Text style={styles.createProfileText}>Create New Profile</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
