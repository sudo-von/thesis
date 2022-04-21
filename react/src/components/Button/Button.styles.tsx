import { StyleSheet } from 'react-native';

const styles = ({ primary }: ReactNativePaper.ThemeColors) => StyleSheet.create({
  button: {
    backgroundColor: primary,
    borderRadius: 50,
  },
  label: {
    color: 'white',
  },
} as const);

export default styles;
