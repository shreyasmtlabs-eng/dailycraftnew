

import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import { px } from '../../utils/dimensions';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalProfile'>;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

type CategoryType = {
  id: string;
  category_name: string;
};

type ProfileItemType = {
  id: string;
  name?: string;
  avatar?: string;
  profile_type?: string;
};

type ProfileDataType = {
  id?: string;
  name?: string;
  avatar?: string;
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
  const activeProfileId = useSelector((state: RootState) => state.profile.activeProfileId);
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
  const [initialLoading, setInitialLoading] = useState(true);


  const filteredTemplates = useMemo(() => {
    let result = [...Template];

    if (searchText.trim() !== '') {
      result = result.filter(t =>
        t.template_name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (activeCategory) {
      result = result.filter(t =>
        t.category_id?.toString() === activeCategory
      );
    }

    return result;
  }, [Template, searchText, activeCategory]);

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
          response.data.data.map((t: LoadTemplateType) => ({
            ...t,
            image_url: undefined,
          }))
        );
      }
    } catch (err) {
      console.log('Error fetchAllTemplates:', err);
    }
  };

  const fetchAllTemplateImages = async () => {
    if (!activeProfileId || filteredTemplates.length === 0) return;

    try {
      setInitialLoading(true);

      for (let i = 0; i < filteredTemplates.length; i++) {
        const template = filteredTemplates[i];

        const existingItemIndex = renderTemplate.findIndex(t => t.id === template.id);
        if (existingItemIndex !== -1 && renderTemplate[existingItemIndex]?.image_url) {
          continue;
        }

        try {
          const response = await axiosInstance.get(
            `${API_ENDPOINTS.HOME_SCREEN_LOAD_TEMPLATE}?profile_id=${activeProfileId}&template_id=${template.id}`,
            { responseType: 'arraybuffer' }
          );

          const base64Image = arrayBufferToBase64(response.data);

          setRenderTemplate(prev => {
            const newArray = [...prev];
            const itemIndex = newArray.findIndex(t => t.id === template.id);
            if (itemIndex !== -1) {
              newArray[itemIndex] = { 
                ...newArray[itemIndex], 
                image_url: `data:image/png;base64,${base64Image}` 
              };
            }
            return newArray;
          });
        } catch (err) {
          console.log(`Error loading template ${template.id}:`, err);
        }
      }
    } catch (err) {
      console.log('fetchAllTemplateImages error:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchTemplateData = async (templateId?: number, index?: number) => {
    if (!templateId || typeof index !== 'number') return;

    const existingItemIndex = renderTemplate.findIndex(t => t.id === templateId);
    if (existingItemIndex !== -1 && renderTemplate[existingItemIndex]?.image_url) {
      return;
    }

    setLoadingIndex(index);
    if (!activeProfileId) return;

    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.HOME_SCREEN_LOAD_TEMPLATE}?profile_id=${activeProfileId}&template_id=${templateId}`,
        { responseType: 'arraybuffer' }
      );

      const base64Image = arrayBufferToBase64(response.data);

      setRenderTemplate(prev => {
        const newArray = [...prev];
        const itemIndex = newArray.findIndex(t => t.id === templateId);
        if (itemIndex !== -1) {
          newArray[itemIndex] = { 
            ...newArray[itemIndex], 
            image_url: `data:image/png;base64,${base64Image}`
          };
        }
        return newArray;
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

      if (Template.length > 0) {
        setRenderTemplate(prev => prev.map(t => ({ ...t, image_url: undefined })));

        fetchAllTemplateImages();
      }
    }, [activeProfileId])
  );


  useEffect(() => {
    if (filteredTemplates.length > 0 && activeProfileId) {
      fetchAllTemplateImages();
    }
  }, [filteredTemplates, activeProfileId]);

  useEffect(() => {
    if (filteredTemplates.length > 0 && !initialLoading) {
      const currentItem = filteredTemplates[currentIndex.current];
      if (currentItem) {
        const existingItem = renderTemplate.find(t => t.id === currentItem.id);
        if (!existingItem?.image_url) {
          fetchTemplateData(currentItem.id, currentIndex.current);
        }
      }
    }
  }, [filteredTemplates, currentIndex.current, initialLoading]);

  const handleDownload = async () => {
    if (filteredTemplates.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No templates available',
      });
      return;
    }

    const currentItem = filteredTemplates[currentIndex.current];
    if (!currentItem) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No template selected',
      });
      return;
    }

    const existingItem = renderTemplate.find(t => t.id === currentItem.id);
    if (!existingItem?.image_url) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Template image not available',
      });
      return;
    }

    downloadImage(existingItem.image_url);
  };

  const handleNext = () => {
    if (filteredTemplates.length === 0) return;

    const nextIndex = (currentIndex.current + 1) % filteredTemplates.length;
    const nextItem = filteredTemplates[nextIndex];

    try {
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } catch (err) {
      console.log('scrollToIndex error', err);
    }

    currentIndex.current = nextIndex;

    const existingItem = renderTemplate.find(t => t.id === nextItem.id);
    if (nextItem && !existingItem?.image_url && !initialLoading) {
      fetchTemplateData(nextItem.id, nextIndex);
    }
  };

  const getCurrentTemplateImage = () => {
    if (filteredTemplates.length === 0) return null;
    const currentItem = filteredTemplates[currentIndex.current];
    if (!currentItem) return null;
    return renderTemplate.find(t => t.id === currentItem.id)?.image_url;
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
                currentIndex.current = 0;
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
              }}
            />
            <Image source={require('../../assets/images/filtericon.png')} style={{ width: 22, height: 22, tintColor: '#414141' }} />
          </View>

          {(searchText || activeCategory) && (
            <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 14 }}>
                  Found {filteredTemplates.length} result{filteredTemplates.length !== 1 ? 's' : ''}
                  {searchText && ` for "${searchText}"`}
                  {activeCategory && ` in "${categories.find(c => c.id === activeCategory)?.category_name}"`}
                </Text>
                {(searchText || activeCategory) && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchText('');
                      setActiveCategory(null);
                      currentIndex.current = 0;
                      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Ionicons name="close-circle" size={16} color="#666" />
                    <Text style={{ color: '#666', marginLeft: 4, fontSize: 12 }}>Clear filters</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

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
                  onPress={() => {
                    setActiveCategory(prev => prev === item.id ? null : item.id);
                    currentIndex.current = 0;
                    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
                  }}
                  style={{
                    backgroundColor: isActive ? '#FF7F32' : '#FFFFFF', 
                    paddingHorizontal: 18, 
                    height: 34, 
                    borderRadius: 20,
                    marginRight: 8,
                    borderWidth: isActive ? 0 : 1,
                    borderColor: '#C5C5C5',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ color: isActive ? '#FFFFFF' : '#000000', fontSize: 12, fontWeight: '700' }}>
                    {item.category_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={{ marginTop: 10, fontSize: 16 }}>Loading...</Text>
            </View>
          ) : filteredTemplates.length === 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16}}>
              <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
                {searchText
                  ? `No templates found`
                  : activeCategory
                  ? `No templates found in "${categories.find(c => c.id === activeCategory)?.category_name}"`
                  : 'No templates available'}
              </Text>
              {(searchText || activeCategory) && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText('');
                    setActiveCategory(null);
                  }}
                  style={{ padding: 10 }}
                >
                  <Text style={{ color: '#FF7F32', fontSize: 14, textDecorationLine: 'underline' }}>
                    Clear search & filters
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <>
              {initialLoading && (
                <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#000" />
                  <Text style={{ marginTop: 1, fontSize: 12, color: '#666' }}>
                    Loading all templates...
                  </Text>
                </View>
              )}
              <FlatList
                ref={flatListRef}
                data={filteredTemplates}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  paddingBottom: px(100),
                }}
                renderItem={({ item, index }) => {
                  const existingItem = renderTemplate.find(t => t.id === item.id);
                  const imageUrl = existingItem?.image_url;
                  const isLoading = loadingIndex === index && !imageUrl && !initialLoading;

                  return (
                    <View style={{  justifyContent: 'center', alignItems: 'center', minHeight: SCREEN_HEIGHT * 0.7 }}>
                      {isLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <ActivityIndicator size="large" color="#000" />
                          <Text style={{ marginTop: 5}}>Loading template...</Text>
                        </View>
                      ) : imageUrl ? (
                        <Image
                          source={{ uri: imageUrl }}
                          style={styles.templateImage}
                          resizeMode="contain"
                        />
                      ) : initialLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          {/* <ActivityIndicator size="small" color="#000" /> */}
                          {/* <Text style={{ marginTop: 5 }}>Loading...</Text> */}
                        </View>
                      ) : (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text>Template image not loaded</Text>
                        </View>
                      )}
                    </View>
                  );
                }}
                onMomentumScrollEnd={e => {
                  const index = Math.round(e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT * 0.7));
                  if (index >= 0 && index < filteredTemplates.length) {
                    currentIndex.current = index;
                  }
                }}
              />
            </>
          )}

          <View style={styles.fixedActionRow}>
            {!isPremium ? (
              <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: '#FF984F' }]} onPress={() => navigation.navigate('SubscriptionModal')}>
                <Text style={styles.downloadText}>Get Membership</Text>
              </TouchableOpacity>
            ) : filteredTemplates.length > 0 && (
              <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            )}

            {filteredTemplates.length > 0 && (
              <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            )}
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
                          alignItems: 'center'
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
