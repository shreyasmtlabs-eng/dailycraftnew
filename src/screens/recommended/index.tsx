
import React, { useRef, useState } from 'react';
import RNFS from 'react-native-fs';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import styles from './styles';
// import { downloadImage } from '../../component/Downloadhelper';

const images = [
  require('../../assets/images/posterimage.png'),
  require('../../assets/images/image2recomd.jpg'),
  require('../../assets/images/recomdextraimage.jpg'),
];

const Recommend = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('currentIndex:>>>>>' , currentIndex);


const handleDownload = async () => {
       console.log('handleDownload clicked>>>>>');
  try {
    const source = Image.resolveAssetSource(images[currentIndex]);

 console.log('image>>>>>:',source);

    if (!source?.uri) {
       console.log('image not found>>>>>');
      return;
    }


     let localPath = source.uri;
    if (Platform.OS === 'android' && !localPath.startsWith('file://')) {
          console.log('android permissions>>>');
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission);

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission denied');
        return;
      }
    }

    const fileName = `recommend_${Date.now()}.jpg`;
    const destPath = `${RNFS.CachesDirectoryPath}/${fileName}`;


    await RNFS.downloadFile({
      fromUrl: source.uri,
      toFile: destPath,
    }).promise;

    await CameraRoll.save(destPath, { type: 'photo' });

    Alert.alert('Success', 'Image saved to gallery');
      console.log('Downloaded to gallery:>>>>>', destPath);

  } catch (error) {
    console.log('Download failed:>>>>>>', error);
    Alert.alert('Error', 'Failed to save image');
  }
};




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
              style={styles.downloadBtn}
              onPress={handleDownload}
            >
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>

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
