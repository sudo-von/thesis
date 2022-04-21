import React from 'react';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import styles from './Button.styles';

type ButtonProps = {
  loading: boolean,
  loadingMessage: string,
  children: React.ReactNode,
  style?: object,
  onPress?: () => void,
};

const Button = ({
  loading, loadingMessage, children, style, onPress,
} : ButtonProps): JSX.Element => {
  const { colors }: ReactNativePaper.Theme = useTheme();
  return (
    <PaperButton
      style={{ ...styles(colors).button, ...style }}
      loading={loading}
      color="white"
      disabled={loading}
      onPress={onPress}
    >
      {loading ? loadingMessage : children}
    </PaperButton>
  );
};

export default Button;
