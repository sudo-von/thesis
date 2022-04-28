import { StyleSheet } from 'react-native';

const drawerContentStyles = StyleSheet.create({
  imageContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  title: {
    marginTop: 20,
  },
  divider: {
    marginVertical: 25,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#f2f2f2',
  },
} as const);

export default drawerContentStyles;
