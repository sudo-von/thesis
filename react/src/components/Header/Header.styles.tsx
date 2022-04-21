import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  subtitle: {
    lineHeight: 12,
    fontSize: 12,
  },
} as const);

export default headerStyles;
