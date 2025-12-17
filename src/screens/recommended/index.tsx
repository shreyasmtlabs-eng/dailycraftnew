import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import styles from './styles';

const Recommend = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/homebackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.header}>
            <Text style={styles.title}>Discover What Makes Your Heart Beat</Text>
            <Text style={styles.subtitle}>
  From flirty moments to heartfelt stories, explore{'\n'}love in every color.
            </Text>
          </View>


          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/posterimage.png')}
              style={styles.posterImage}
              resizeMode="cover"
            />
          </View>


          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Recommend;
