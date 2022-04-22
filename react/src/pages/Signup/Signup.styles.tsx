import { StyleSheet } from 'react-native';

const signupStyles = (color: string) => StyleSheet.create({
  title: {
    fontSize: 26,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color,
  },
} as const);

export default signupStyles;
