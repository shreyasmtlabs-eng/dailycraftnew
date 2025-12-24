


import RNFS from 'react-native-fs';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import axios from 'axios';
import { Buffer } from 'buffer';


const requestPermission = async () => {
  if (Platform.OS !== 'android') return true;

  if (Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};


export const downloadImage = async (imagePath: string) => {
  try {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Storage permission is required');
      return;
    }

    const fileName = `image_${Date.now()}.jpg`;

    const filePath =
      Platform.OS === 'android'
        ? `${RNFS.PicturesDirectoryPath}/${fileName}`
        : `${RNFS.TemporaryDirectoryPath}/${fileName}`;

    let base64Data = '';

    if (imagePath.startsWith('data:image')) {
      base64Data = imagePath.replace(/^data:image\/\w+;base64,/, '');
    } else {
      const response = await axios.get(imagePath, {
        responseType: 'arraybuffer',
      });
      base64Data = Buffer.from(response.data).toString('base64');
    }

    await RNFS.writeFile(filePath, base64Data, 'base64');


    if (Platform.OS === 'android') {
      await RNFS.scanFile(filePath);
      Alert.alert('Success', 'Image saved to Gallery');
    } else {
      await CameraRoll.save(filePath, { type: 'photo' });
      Alert.alert('Success', 'Image saved to Photos');
    }
  } catch (error) {
    console.log('Download error:', error);
    Alert.alert('Error', 'Image download failed');
  }
};
