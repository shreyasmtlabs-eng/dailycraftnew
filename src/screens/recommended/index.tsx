
import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from 'react-native';

import styles from './styles';


const images = [
  require('../../assets/images/posterimage.png'),
  require('../../assets/images/image2recomd.jpg'),
  require('../../assets/images/recomdextraimage.jpg'),
];

  const Recommend = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('currentIndex:>>>>>' , currentIndex);


  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/homebackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>

          <View style={styles.header}>
            <Text style={styles.title}>
              Discover What Makes Your Heart Beat
            </Text>

            <Text style={styles.subtitle}>
              From flirty moments to heartfelt stories, explore{'\n'}
              love in every color.
            </Text>

          </View>

          <View style={styles.imageWrapper}>

           <FlatList
              ref={flatListRef}
              data={images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={item}
                  style={styles.posterImage}
                  resizeMode="cover"
                />

              )}

              onMomentumScrollEnd={(e) => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x /
                    e.nativeEvent.layoutMeasurement.width
                );
                setCurrentIndex(index);
              }}

            />
          </View>

          <View style={styles.buttonRow}>


            <TouchableOpacity
              style={styles.nextBtn}
              onPress={handleNext}
              disabled={currentIndex === images.length - 1}
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
