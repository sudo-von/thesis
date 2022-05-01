import { StyleSheet } from 'react-native';

const panicButtonStyle = (color:string) => StyleSheet.create({
  textView: {
    flex: 1,
  },
  view: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  small: {
    color,
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const);

export default panicButtonStyle;
