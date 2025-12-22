
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import styles from './styles';
import Button from '../../component/button';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { adminAxios } from '../../services/axiousinstance';
import { API_ENDPOINTS } from '../../services/endpoints';

const { width } = Dimensions.get('window');

type ChooseLanguageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChooseLanguage'>;
};

const ChooseLanguage = ({ navigation }: ChooseLanguageProps) => {
  const [languages, setLanguages] = useState<{ id: number; language_name: string }[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await adminAxios.get(API_ENDPOINTS.GET_ALL_LANGUAGE);
        console.log('fetch all languages response:>>>>>>', response.data);

        if (response.data?.status) {
          setLanguages(response.data.data);
          setSelected(response.data.data[0]?.language_name || '');
        } else {
          console.log('Error', 'Failed to fetch languages');
        }
      } catch (error) {
        console.log('Error fetching languages:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchLanguages();
  }, []);

  if (loading) {

    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF8C32" />
      </View>

    );
  }


  const rows = [];
  for (let i = 0; i < languages.length; i += 2) {
    rows.push(languages.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/wavyheader.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={width * 0.07} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Text style={styles.title}>Choose Your Language ✨</Text>
          <Text style={styles.subtitle}>
            Personal or Business — pick what suits your vibe and start crafting your journey!
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.grid}>

        {rows.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>

            {row.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                style={[styles.langCard, selected === lang.language_name && styles.selectedCard]}
                onPress={() => setSelected(lang.language_name)}
              >
                <Text style={styles.langText}>{lang.language_name}</Text>
                {selected === lang.language_name && (
                  <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32" style={styles.tickIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>

        ))}
      </View>

      <View style={styles.bottomContainer}>
        <Button title="Continue" onPress={() => navigation.navigate('ChooseProfileType')} />
      </View>
    </View>
  );
};

export default ChooseLanguage;
