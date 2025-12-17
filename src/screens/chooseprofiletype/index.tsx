import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import styles from './styles';
import Button from '../../component/button';

import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
type ChooseProfileTypeProps = {
  navigation : NativeStackNavigationProp<RootStackParamList,'ChooseProfileType'>
}

const ChooseProfileType = ({ navigation } : ChooseProfileTypeProps) => {
  const [selected, setSelected] = useState('personal');

  const handleContinue = () => {
if( selected === 'personal'){
  navigation.navigate('PersonalProfile');
}else if( selected === 'business'){
  navigation.navigate('BusinessProfile');

}



  };

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
            <Icon name="chevron-back" size={width * 0.07} color="#FFFFFF"/>
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Text style={styles.title}>Choose Your Profile Type ✨</Text>
          <Text style={styles.subtitle}>
            Personal or Business — pick what suits your vibe and start crafting your journey!
          </Text>
        </View>
      </ImageBackground>


      <View style={styles.cardsContainer}>

        <TouchableOpacity
          style={[
            styles.card,
            selected === 'personal' && styles.selectedCard,
          ]}
          onPress={() => setSelected('personal')}
        >
          <View style={styles.circle}/>
          <Text style={styles.cardTitle}>Personal</Text>
          <Text style={styles.cardDesc}>
            Explore creativity your way—discover and share posters you love!
          </Text>

          {selected === 'personal' && (
            <View style={styles.tickIcon}>
              <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32"/>
            </View>
          )}
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.card,
            selected === 'business' && styles.selectedCard,
          ]}
          onPress={() => setSelected('business')}

        >
          <View style={styles.circle}/>
          <Text style={styles.cardTitle}>Business</Text>
          <Text style={styles.cardDesc}>
            Showcase your brand with creative posters and grow your audience!
          </Text>

          {selected === 'business' && (
            <View style={styles.tickIcon}>
              <Icon name="checkmark-circle" size={width * 0.07} color="#FF8C32"/>
            </View>
          )}


        </TouchableOpacity>
      </View>
<View style={styles.bottomContainer}>
  <Button
    title="Continue"  onPress = {handleContinue}
  />
</View>
    </View>

  );
};

export default ChooseProfileType;

