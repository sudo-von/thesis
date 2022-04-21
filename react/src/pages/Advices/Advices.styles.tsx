import { StyleSheet } from 'react-native';

const advicesStyles = (colors:ReactNativePaper.ThemeColors) => StyleSheet.create({
  container: {
    padding: 0,
    justifyContent: 'center',
  },
  view: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  bottomView: {
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
} as const);

export default advicesStyles;
