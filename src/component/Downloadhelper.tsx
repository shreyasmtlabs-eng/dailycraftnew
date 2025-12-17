import RNFS from 'react-native-fs';
import { Platform, Alert } from 'react-native';
import Share from 'react-native-share';
import axios from 'axios';
import { Buffer } from 'buffer';


export const downloadImage = async (imagePath: string) => {
  try {
    const fileName = `image_${Date.now()}.jpg`;
    const filePath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.TemporaryDirectoryPath}/${fileName}`;

    let base64Data = '';

    if (imagePath.startsWith('data:image')) {
      base64Data = imagePath.replace(/^data:image\/\w+;base64,/, '');
    } else {
      const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
      base64Data = Buffer.from(response.data, 'binary').toString('base64');
    }

    await RNFS.writeFile(filePath, base64Data, 'base64');

    if (Platform.OS === 'android') {
      Alert.alert('Success', 'Image downloaded in Downloads folder!');
    } else {
      await Share.open({
        url: `file://${filePath}`,
        type: 'image/jpeg',
        filename: fileName,
      });
    }
  } catch (err) {
    console.log('Download Error:', err);
    Alert.alert('Error', 'Could not download image');
  }
};
