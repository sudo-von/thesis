import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  view: {
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  small: {
    textAlign: 'center',
  },
  scrollView: {
    paddingHorizontal: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
} as const);

export default homeStyles;
