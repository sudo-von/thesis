import { StyleSheet } from 'react-native';

const createDepartmentStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  view: {
    marginVertical: 20,
  },
} as const);

export default createDepartmentStyles;
