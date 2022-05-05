import { StyleSheet } from 'react-native';

const createAdviceStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  view: {
    marginVertical: 20,
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const);

export default createAdviceStyles;
