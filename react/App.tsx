import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from 'src/refs/navigation.ref';
import { NavigationContainer } from '@react-navigation/native';
import theme from 'src/constants/themes';
import AuthProvider from './src/providers/auth.provider';
import Router from './src/router/Router';

const App = (): JSX.Element => (
  <AuthProvider>
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  </AuthProvider>
);

export default App;
