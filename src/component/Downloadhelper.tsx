// import RNFS from 'react-native-fs';
// import { Platform, Alert } from 'react-native';
// import Share from 'react-native-share';
// import axios from 'axios';
// import { Buffer } from 'buffer';


// export const downloadImage = async (imagePath: string) => {
//   try {
//     const fileName = `image_${Date.now()}.jpg`;
//     const filePath =
//       Platform.OS === 'android'
//         ? `${RNFS.DownloadDirectoryPath}/${fileName}`
//         : `${RNFS.TemporaryDirectoryPath}/${fileName}`;
 
//     let base64Data = '';

//     if (imagePath.startsWith('data:image')) {
//       base64Data = imagePath.replace(/^data:image\/\w+;base64,/, '');
//     } else {
//       const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
//       base64Data = Buffer.from(response.data, 'binary').toString('base64');
//     }

//     await RNFS.writeFile(filePath, base64Data, 'base64');

//     if (Platform.OS === 'android') {
//       Alert.alert('Success', 'Image downloaded in Downloads folder!');
//     } else {
//       await Share.open({
//         url: `file://${filePath}`,
//         type: 'image/jpeg',
//         filename: fileName,
//       });
//     }
//   } catch (err) {
//     console.log('Download Error:', err);
//     Alert.alert('Error', 'Could not download image');
//   }
// };


import RNFS from 'react-native-fs';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
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
      Alert.alert('Permission denied');
      return;
    }

    const fileName = `image_${Date.now()}.jpg`;
    const filePath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    let base64Data = '';

    if (imagePath.startsWith('data:image')) {
      base64Data = imagePath.replace(/^data:image\/\w+;base64,/, '');
    } else {
      const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
      base64Data = Buffer.from(response.data).toString('base64');
    }

    await RNFS.writeFile(filePath, base64Data, 'base64');

    Alert.alert(
      'Success',
      Platform.OS === 'android'
        ? 'Image saved in Downloads'
        : 'Image saved successfully'
    );
  } catch (error) {
    console.log('Download error:', error);
    Alert.alert('Error', 'Download failed');
  }
};

