import { StyleSheet } from 'react-native';

const departmentCardContentStyle = (colors:ReactNativePaper.ThemeColors) => StyleSheet.create({
  cardContent: {
    padding: 8,
  },
  badge: {
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.primary,
  },
  description: {
    color: colors.text,
  },
} as const);

export default departmentCardContentStyle;
