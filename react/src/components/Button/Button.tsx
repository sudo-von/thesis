import React from 'react';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import buttonStyles from './Button.styles';

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
  const theme = useTheme();
  const styles = buttonStyles(theme.colors.primary);
  return (
    <PaperButton
      contentStyle={{ ...styles.button, ...style }}
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
