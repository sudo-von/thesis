import { StyleSheet } from 'react-native';

const configurationStyles = StyleSheet.create({
  view: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
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
  loader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default configurationStyles;
