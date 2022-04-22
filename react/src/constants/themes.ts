import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#1E319D',
    accent: '#BAB2B5',
    placeholder: '#2539aa',
    error: '#DB1304',
  },
};

export default theme;
