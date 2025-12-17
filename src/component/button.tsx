

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions,ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({ title, onPress, disabled = false}: ButtonProps) => {

  const isLoading = title === 'Sending...';
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.8}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (

      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
      </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF984F',
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: width * 0.03,
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.05,
    marginBottom: width * 0.02,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: width * 0.045,
  },
  disabledButton: {
    backgroundColor: '#FFD1A1',
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;
