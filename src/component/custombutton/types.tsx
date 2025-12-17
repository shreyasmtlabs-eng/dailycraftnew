import { TextStyle, ViewStyle } from 'react-native';

export type CommonButtonProps = {
  style?: ViewStyle | [ViewStyle];
  textStyle?: TextStyle | [TextStyle];
  leftIcon?: boolean;
  rightIcon?: boolean;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  loaderColor?: string;
  onPress?: () => void;
};

export type CommonStyleProps = {
  buttonCOntainer: ViewStyle;
  buttontext: TextStyle;
};
