import { StyleSheet } from 'react-native';

const logoStyles = (size: number) => StyleSheet.create({
  image: {
    borderRadius: 200,
    width: size,
    height: size,
    resizeMode: 'contain',
  },
} as const);

export default logoStyles;
