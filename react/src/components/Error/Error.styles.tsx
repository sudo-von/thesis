import { StyleSheet } from 'react-native';

const errorStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3242B',
    borderRadius: 50,
    padding: 5,
    overflow: 'scroll',
  },
  text: {
    flexShrink: 1,
    color: 'white',
    textAlign: 'center',
  },
} as const);

export default errorStyles;
