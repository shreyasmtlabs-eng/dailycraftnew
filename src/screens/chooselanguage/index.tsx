import React, { useState} from 'react';
import {View,Text,TouchableOpacity,ImageBackground,Dimensions} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import styles from './styles';
import Button from '../../component/button';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const { width } = Dimensions.get('window');

type ChooseLanguageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChooseLanguage'>;
};

const ChooseLanguage = ({ navigation } : ChooseLanguageProps) => {

  const [selected, setSelected] = useState('English');

  return (

    <View style={styles.container}>

      <ImageBackground
        source={require('../../assets/images/wavyheader.png')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
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

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.langCard, selected === 'English' && styles.selectedCard]}
            onPress={() => setSelected('English')}>
            <Text style={styles.langText}>English</Text>
            {selected === 'English' && (
              <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32" style={styles.tickIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langCard, selected === 'Hindi' && styles.selectedCard]}
            onPress={() => setSelected('Hindi')}>
            <Text style={styles.langText}>Hindi</Text>
            {selected === 'Hindi' && (
              <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32" style={styles.tickIcon} />
            )}
           </TouchableOpacity>
        </View>


        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.langCard, selected === 'Marathi' && styles.selectedCard]}
            onPress={() => setSelected('Marathi')}>
            <Text style={styles.langText}>Marathi</Text>
            {selected === 'Marathi' && (
              <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32" style={styles.tickIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langCard, selected === 'Tamil' && styles.selectedCard]}
            onPress={() => setSelected('Tamil')}>
            <Text style={styles.langText}>Tamil</Text>
            {selected === 'Tamil' && (
              <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32" style={styles.tickIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.bottomContainer}>
       <Button
    title="Continue"
    onPress={() => navigation.navigate('ChooseProfileType')}
  />
</View>
    </View>
  );
};

export default ChooseLanguage;
