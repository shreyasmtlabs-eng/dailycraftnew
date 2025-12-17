
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
  ActivityIndicator,Alert,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import axiosInstance, { adminAxios } from '../../services/axiousinstance';
import { API_ENDPOINTS } from '../../services/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { downloadImage } from '../../component/Downloadhelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [allProfiles, setAllProfiles] = useState<ProfileItemType[]>([]);
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const [Template,setTemplate] = useState<LoadTemplateType[]>([]);
  const [renderTemplate, setRenderTemplate] = useState<(LoadTemplateType & { image_url?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [profilesLoading, setProfilesLoading] = useState(false);
const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
const currentIndex = useRef(0);

const isPremium = useSelector(
  (state: RootState) => state.membership.isPremium
);

  const fetchCategories = async () => {
    try {
      const response = await adminAxios.get(API_ENDPOINTS.GET_ALL_CATEGORY);
       console.log('fetch categories>>>>>>:', response.data);
      if (response.data?.status) {
        setCategories(response.data.data || []);
      }
    } catch (err) {
      console.log('Error fetching categories:', err);
    }
  };


  const fetchAllProfiles = async () => {
    try {
      setProfilesLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_PROFILES);
       console.log('get all profiles:>>>>>>>', response.data);
      if (response.data?.status && Array.isArray(response.data.data)) {
        setAllProfiles(response.data.data);


        const savedId = await AsyncStorage.getItem('profile_id');
        if (!savedId && response.data.data.length > 0) {
          const firstId = response.data.data[0].id.toString();
          await AsyncStorage.setItem('profile_id', firstId);
          await fetchProfileDetails(firstId);
        }
      } else {
        setAllProfiles([]);
      }
    } catch (err) {
      console.log('Error fetching profiles:>>>>>>>', err);
      setAllProfiles([]);
    } finally {
      setProfilesLoading(false);
    }
  };


  const fetchProfileDetails = async (profileId?: string) => {
    try {
      const id = profileId || (await AsyncStorage.getItem('profile_id'));
      if (!id) return;

      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_DETAILS}${id}`);
       console.log('get profiles details on homescreen>>>>>>>>:', response.data);
      if (response.data?.status && response.data.data) {
        setProfileData(response.data.data);
      }
    } catch (err) {
      console.log('Error fetching profile details:>>>>>>', err);
    }
  };


const fetchAllTemplates = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.DOWNLOAD_TEMPLATE);
    console.log('ALL Templates Response:>>>>>>>>', response.data);

    if (response.data?.status && Array.isArray(response.data.data)) {
      setTemplate(response.data.data);
      setRenderTemplate(response.data.data.map((t: any) => ({ ...t, image_url: t.file_path })));
    } else {
      setTemplate([]);
      setRenderTemplate([]);
    }
  } catch (err) {
    console.log('Error fetching templates:>>>>>>>', err);
    setTemplate([]);
    setRenderTemplate([]);
  }
};


const fetchTemplateData = async (templateId: number, index: number) => {
  try {
    if (!templateId) return;
    if (renderTemplate[index]?.image_url) return;

    setLoadingIndex(index);

    const profileId = await AsyncStorage.getItem('profile_id');
    if (!profileId) return;

    const response = await axiosInstance.get(
      `template?profile_id=${profileId}&template_id=${templateId}`,
      { responseType: 'arraybuffer' }
    );

    const base64Image =
      'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64');

    setRenderTemplate(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], image_url: base64Image };
      return copy;
    });
  } catch (err) {
    console.log('Error fetching template image:', err);
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
      const savedProfileId = await AsyncStorage.getItem('profile_id');
      if (savedProfileId) {
        await fetchProfileDetails(savedProfileId);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleDownload = async () => {
  const currentTemplate = renderTemplate[currentIndex.current];

  if (!currentTemplate) {
    Alert.alert('Error', 'No template selected');
    return;
  }

  const imageUrl =
    currentTemplate.image_url || currentTemplate.file_path;

  if (!imageUrl) {
    Alert.alert('Error', 'Template image not available');
    return;
  }

  downloadImage(imageUrl);
};


const handleNext = () => {
  if (renderTemplate.length === 0) return;

  const nextIndex = (currentIndex.current + 1) % renderTemplate.length;

  try {
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  } catch (err) {
    console.log('scrollToIndex error', err);
  }

  currentIndex.current = nextIndex;

  if (!renderTemplate[nextIndex]?.image_url && renderTemplate[nextIndex]?.id) {
    fetchTemplateData(renderTemplate[nextIndex].id, nextIndex);
  }
};



const renderTemplateItem = ({
  item,
  index,
}: {
  item: LoadTemplateType & { image_url?: string };
  index: number;
}) => {
  if (!item.image_url) fetchTemplateData(item.id, index);

  const isLoadingThisItem = loadingIndex === index && !item.image_url;

  return (
    <View style={{ height: SCREEN_HEIGHT - 120, paddingLeft: 17,paddingRight:17 }}>
      <View style={styles.posterCard}>

        {profileData && (
           <View>
    <View style={styles.profileImageContainer}>
            <Image
              source={
                profileData.avatar
                  ? { uri: profileData.avatar }
                  : require('../../assets/images/shubhamicon.png')
              }
              style={styles.profileImg}/>
</View>
               <Text style={styles.userName} numberOfLines={1}>
              {profileData.name || 'User'}
            </Text>
          </View>
        )}


        {isLoadingThisItem ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 8 }}>Loading...</Text>
          </View>
        ) : (
          <Image
            source={{ uri: item.image_url || item.file_path }}
            style={{ width: '100%', height: '70%', borderRadius: 12 }}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../assets/images/homebackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.container]}>

          <View style={styles.header}>
            <View style={styles.profileSection}>
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View style={styles.profileImageContainer}>
                  <Image
                    source={
                      profileData?.avatar
                        ? { uri: profileData.avatar }
                        : require('../../assets/images/shubhamicon.png')
                    }
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
              onChangeText={(text)=>{
                setSearchText(text);

                if(text.trim()===''){
                  setRenderTemplate(
        Template.map(t => ({ ...t, image_url: t.file_path })));

                }else{
                  const filtered = Template.filter(t =>
        t.template_name
          ?.toLowerCase()
          .includes(text.toLowerCase())
      );

      setRenderTemplate(
        filtered.map(t => ({ ...t, image_url: t.file_path }))
      );
    }

    currentIndex.current = 0;
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });

                }

              }
            />
            <Image
              source={require('../../assets/images/filtericon.png')}
              style={{ width: 22, height: 22, tintColor: '#414141' }}
            />
          </View>


          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
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
    ref={(r) => (flatListRef.current = r)}
    data={renderTemplate}
    renderItem={renderTemplateItem}
    keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
    pagingEnabled
    snapToInterval={SCREEN_HEIGHT}
    decelerationRate="fast"
    showsVerticalScrollIndicator={false}
    removeClippedSubviews={false}
    windowSize={5}
    initialNumToRender={1}
    maxToRenderPerBatch={1}
    getItemLayout={(_, index) => ({ length: SCREEN_HEIGHT, offset: SCREEN_HEIGHT * index, index })}
    onMomentumScrollEnd={(e) => {
      const index = Math.round(e.nativeEvent.contentOffset.y / SCREEN_HEIGHT);
      currentIndex.current = index;
      if (!renderTemplate[index]?.image_url && renderTemplate[index]?.id) {
        fetchTemplateData(renderTemplate[index].id, index);
      }
    }}
  />
)}

{renderTemplate.length === 0 && !loading && (
  <View style={{ alignItems: 'center', marginTop: 40 }}>
    <Text style={{ color: '#777' }}>No templates found</Text>
  </View>
)}



          <View style={styles.fixedActionRow}>
              {!isPremium ? (
                  <TouchableOpacity
      style={[styles.downloadBtn, { backgroundColor: '#FF984F' }]}
      onPress={() => navigation.navigate('SubscriptionModal')}
    >
      <Text style={styles.downloadText}>Get Membership</Text>
    </TouchableOpacity>
     ) : (
            <TouchableOpacity style={styles.downloadBtn}  onPress={handleDownload}>
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
                  allProfiles.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.profileCard}
                      activeOpacity={0.8}
                      onPress={async () => {
                        setModalVisible(false);
                        await AsyncStorage.setItem('profile_id', item.id.toString());
                        await fetchProfileDetails(item.id.toString());

      if (renderTemplate[currentIndex.current]?.id) {
      fetchTemplateData(renderTemplate[currentIndex.current].id, currentIndex.current);
  }
                      }}
                    >
                      <View style={styles.avatarBorderBox}>
                        <Image
                          source={item.avatar ? { uri: item.avatar } : require('../../assets/images/shubhamicon.png')}
                          style={styles.profileAvatar}
                        />
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
