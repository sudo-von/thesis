import { StyleSheet } from 'react-native';

const buttonStyles = (backgroundColor: string) => StyleSheet.create({
  button: {
    backgroundColor,
    borderRadius: 50,
    paddingVertical: 6,
  },
  label: {
    color: 'white',
  },
} as const);

export default buttonStyles;
