import { StyleSheet } from 'react-native';

const adviceCardContentStyles = (colors:ReactNativePaper.ThemeColors) => StyleSheet.create({
  content: {
    padding: 8,
  },
  badge: {
    backgroundColor: colors.primary,
  },
  paragraph: {
    color: colors.primary,
  },
  small: {
    color: colors.accent,
  },
} as const);

export default adviceCardContentStyles;
