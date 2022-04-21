import { Platform, StyleSheet } from 'react-native';

const sliderInputStyles = StyleSheet.create({
  slider: {
    marginLeft: Platform.select({ ios: 0, android: -15 }),
    marginRight: Platform.select({ ios: 0, android: -15 }),
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default sliderInputStyles;
