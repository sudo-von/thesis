import { StyleSheet } from 'react-native';

const optionStyles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
} as const);

export default optionStyles;
