import { StyleSheet } from 'react-native';

const adviceCardActionsStyles = StyleSheet.create({
  cardActions: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
} as const);

export default adviceCardActionsStyles;
