import { StyleSheet } from 'react-native';

const departmentCardStyles = StyleSheet.create({
  card: {
    margin: 5,
    borderWidth: 0.3,
  },
  view: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const);

export default departmentCardStyles;
