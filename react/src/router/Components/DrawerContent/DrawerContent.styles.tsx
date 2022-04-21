import { StyleSheet } from 'react-native';

const drawerContentStyles = StyleSheet.create({
  drawerContent: {
    margin: 10,
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
} as const);

export default drawerContentStyles;
