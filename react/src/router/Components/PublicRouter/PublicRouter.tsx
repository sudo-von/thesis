import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from 'src/pages/Login/Login';
import Signup from 'src/pages/Signup/Signup';
import { DrawerParamList, Route } from 'src/router/Router';

const routes: Route[] = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Signup',
    component: Signup,
  },
];

const Drawer = createDrawerNavigator<DrawerParamList>();

const PublicRouter = (): JSX.Element => (
  <Drawer.Navigator initialRouteName="Login">
    {
      routes.map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
      ))
    }
  </Drawer.Navigator>
);

export default PublicRouter;
