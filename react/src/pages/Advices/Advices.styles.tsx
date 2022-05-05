import { StyleSheet } from 'react-native';

const advicesStyles = (color:string) => StyleSheet.create({
  container: {
    padding: 10,
  },
  view: {
    marginVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  caption: {
    marginTop: 20,
    color,
  },
  small: {
    textAlign: 'center',
    color,
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const);

export default advicesStyles;
