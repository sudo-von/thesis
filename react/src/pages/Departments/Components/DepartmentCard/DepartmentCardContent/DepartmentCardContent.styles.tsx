import { StyleSheet } from 'react-native';

const departmentCardContentStyle = (colors:ReactNativePaper.ThemeColors) => StyleSheet.create({
  cardContent: {
    padding: 8,
  },
  header: {
    marginBottom: 15,
  },
  badge: {
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.primary,
  },
  paragraph: {
    color: colors.accent,
  },
  small: {
    color: colors.accent,
  },
} as const);

export default departmentCardContentStyle;
