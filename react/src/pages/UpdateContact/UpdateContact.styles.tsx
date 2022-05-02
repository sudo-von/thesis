import { StyleSheet } from 'react-native';

const updateContactStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  view: {
    marginVertical: 40,
  },
  loader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const);

export default updateContactStyles;
