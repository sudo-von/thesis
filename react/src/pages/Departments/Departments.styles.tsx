import { StyleSheet } from 'react-native';

const departmentsStyle = (
  { primary, background }: ReactNativePaper.ThemeColors,
) => StyleSheet.create({
  container: {
    padding: 0,
  },
  view: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  tabs: {
    backgroundColor: primary,
    color: background,
  },
  bottomView: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: primary,
  },
} as const);

export default departmentsStyle;
