
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import axiosInstance from '../../services/axiousinstance';
import { API_ENDPOINTS } from '../../services/endpoints';
import { downloadImage } from '../../component/Downloadhelper';

type TemplateItem = {
  file_path: string;
  template_name?: string;
};

const Download = () => {
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
       setLoading(true);
      setNetworkError(false);

      try {
        const response = await axiosInstance.get(API_ENDPOINTS.DOWNLOAD_TEMPLATE);
 console.log('download Templates Response:>>>>>>', response.data);

        if (response.data?.status && Array.isArray(response.data?.data)) {
          setTemplates(response.data.data);
        } else {
          setTemplates([]);
        }
      } catch (error:any) {

        const message = error?.message?.toLowerCase?.() ?? '';

        if (message.includes('network error') || error.code === 'ERR_NETWORK') {
          setNetworkError(true);
        }

        setTemplates([]);

        console.log('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const openPreview = (img: string) => {
    setSelectedImage(img);
    setShowModal(true);
  };


  return (
    <ImageBackground
      source={require('../../assets/images/homebackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>All Downloads</Text>
            <Text style={styles.subtitle}>
              Browse all your saved posters and download them anytime.
            </Text>
          </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160 }}
        >
          {/* <View style={styles.header}>
            <Text style={styles.title}>All Downloads</Text>
            <Text style={styles.subtitle}>
              Browse all your saved posters and download them anytime.
            </Text>
          </View> */}

          {loading && !networkError && (
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
          )}

             {!loading && networkError && (
            <Text
              style={{
                marginTop: 40,
                textAlign: 'center',
                color: '#fff',
                fontSize: 16,
              }}
            >
              Please check your internet connection
            </Text>
          )}

   {!loading && !networkError && (
            <View style={styles.gridContainer}>
              {templates.length > 0 ? (
                templates.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.gridItem}
                    onPress={() => openPreview(item.file_path)}
                  >
                    <Image
                      source={{ uri: item.file_path }}
                      style={styles.posterImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noDataText}>No templates available</Text>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>


      <Modal visible={showModal} transparent animationType="fade">
        <View
          style={styles. modelshow}
        >

          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
          >
            <Ionicons name="close" size={35} color="#fff" />
          </TouchableOpacity>


          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.url}
              resizeMode="contain"
            />
          )}


          <TouchableOpacity
            onPress={()=> selectedImage && downloadImage(selectedImage)}
            style={styles.downloadselectimage}
          >
            <Ionicons name="download-outline" size={24} color="#fff" />
            <Text
              style={styles.downloadoutline}
            >
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Download;
