import { DefaultTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#1E319D',
    accent: '#888888',
    placeholder: '#2539aa',
    error: '#DB1304',
    disabled: '#cccccc',
  },
};

export default theme;
