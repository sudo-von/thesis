import { StyleSheet } from 'react-native';

const createAdviceStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  view: {
    marginVertical: 40,
  },
} as const);

export default createAdviceStyles;
