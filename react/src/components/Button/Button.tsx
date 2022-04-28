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
  const backgroundColor = loading ? theme.colors.disabled : theme.colors.primary;
  const color = loading ? theme.colors.accent : theme.colors.background;
  const styles = buttonStyles(backgroundColor, color);
  return (
    <PaperButton
      contentStyle={{ ...styles.button, ...style }}
      labelStyle={styles.label}
      loading={loading}
      disabled={loading}
      onPress={onPress}
      mode="text"
    >
      {loading ? loadingMessage : children}
    </PaperButton>
  );
};

export default Button;
