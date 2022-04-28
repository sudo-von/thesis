import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  view: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  scrollView: {
    paddingHorizontal: 5,
  },
} as const);

export default homeStyles;
