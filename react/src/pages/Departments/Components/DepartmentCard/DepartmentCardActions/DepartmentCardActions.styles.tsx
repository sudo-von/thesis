import { StyleSheet } from 'react-native';

const departmentCardActionsStyles = StyleSheet.create({
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  fab: {
    backgroundColor: '#04245c',
  },
} as const);

export default departmentCardActionsStyles;
