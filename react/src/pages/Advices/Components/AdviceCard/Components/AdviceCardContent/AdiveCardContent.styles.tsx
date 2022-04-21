import { StyleSheet } from 'react-native';

const adviceCardContentStyles = (colors:ReactNativePaper.ThemeColors) => StyleSheet.create({
  small: {
    color: colors.primary,
  },
} as const);

export default adviceCardContentStyles;
