import { StyleSheet } from 'react-native';

const loginStyles = (color: string) => StyleSheet.create({
  text: {
    color,
  },
} as const);

export default loginStyles;
