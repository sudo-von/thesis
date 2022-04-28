import { StyleSheet } from 'react-native';

const buttonStyles = (backgroundColor: string, color: string) => StyleSheet.create({
  button: {
    backgroundColor,
    borderRadius: 50,
    paddingVertical: 6,
  },
  label: {
    color,
  },
} as const);

export default buttonStyles;
