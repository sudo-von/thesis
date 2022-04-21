import { StyleSheet } from 'react-native';

const adviceCardContentStyle = StyleSheet.create({
  cardContent: {
    padding: 8,
  },
  header: {
    marginBottom: 15,
  },
  content: {
    marginVertical: 15,
  },
  user: {
    fontSize: 16,
  },
} as const);

export default adviceCardContentStyle;
