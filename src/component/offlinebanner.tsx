import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const OfflineBanner = () => {
  const isConnected = useSelector(
    (state: RootState) => state.internet.isConnected
  );

  if (isConnected){
return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No internet connection. Please connect.
      </Text>
    </View>
  );
};

export default OfflineBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
  },
});
