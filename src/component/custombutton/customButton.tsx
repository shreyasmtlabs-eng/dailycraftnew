import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { px, deviceWidth } from '../../utils/dimensions';
import color from '../../constant/color';
const Button = ({ title, onPress, disabled, loading }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      activeOpacity={disabled || loading ? 1 : 0.8}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
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
    backgroundColor: color.primary,
    width: deviceWidth * 0.9,
    alignSelf: 'center',
    paddingVertical: px(12),
    borderRadius: px(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px(16),
    marginBottom: px(8),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: px(16),
  },
  disabledButton: {
    backgroundColor:color.buttondisable,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;
