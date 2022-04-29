import { StyleSheet } from 'react-native';

const departmentCardActionsStyles = StyleSheet.create({
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
} as const);

export default departmentCardActionsStyles;
