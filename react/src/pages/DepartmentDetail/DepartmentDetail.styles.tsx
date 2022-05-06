import { StyleSheet } from 'react-native';

const departmentDetailStyles = (color:string) => StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  textView: {
    flex: 1,
    padding: 15,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  title: {
    color,
  },
  image: {
    height: 130,
    width: 130,
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

export default departmentDetailStyles;
