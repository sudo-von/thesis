import { StyleSheet } from 'react-native';

const fabStyles = ({ primary }: ReactNativePaper.ThemeColors) => StyleSheet.create({
  fab: {
    color: 'white',
    backgroundColor: primary,
    position: 'absolute',
    margin: 15,
    right: 0,
    top: 0,
  },
} as const);

export default fabStyles;
