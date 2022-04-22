import { StyleSheet } from 'react-native';

const errorStyles = (color: string) => StyleSheet.create({
  content: {
    paddingBottom: 0,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    fontSize: 16,
    color,
  },
  message: {
    marginTop: 15,
  },
} as const);

export default errorStyles;
