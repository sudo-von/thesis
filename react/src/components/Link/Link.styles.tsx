import { StyleSheet } from 'react-native';

const linkStyles = ({ primary }: ReactNativePaper.ThemeColors) => StyleSheet.create({
  caption: {
    fontSize: 16,
    color: primary,
  },
} as const);

export default linkStyles;
