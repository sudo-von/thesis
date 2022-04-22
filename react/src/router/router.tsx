/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import useUser from 'src/hooks/useUser';
import { useTheme } from 'react-native-paper';
import Login from 'src/pages/Login/Login';
import Signup from 'src/pages/Signup/Signup';
import Logout from 'src/pages/Logout/Logout';
import Home from 'src/pages/Home/Home';
import PanicButton from 'src/pages/PanicButton/PanicButton';
import Advices from 'src/pages/Advices/Advices';
import Departments from 'src/pages/Departments/Departments';
import CreateDepartment from 'src/pages/CreateDepartment/CreateDepartment';
import UpdateDepartment from 'src/pages/UpdateDepartment/UpdateDepartment';
import CreateAdvice from 'src/pages/CreateAdvice/CreateAdvice';
import UpdateAdvice from 'src/pages/UpdateAdvice/UpdateAdvice';
import Suggestion from 'src/pages/Suggestion/Suggestion';
import Configuration from 'src/pages/Configuration/Configuration';
import UpdateAccount from 'src/pages/UpdateAccount/UpdateAccount';
import CreateContact from 'src/pages/CreateContact/CreateContact';
import UpdateContact from 'src/pages/UpdateContact/UpdateContact';
import routerStyles from './router.styles';
import DrawerContent from './Components/DrawerContent/DrawerContent';

export type DrawerParamList = {
  Login: undefined,
  Signup: undefined,
  Home: undefined,
  Configuration: undefined,
  Logout: undefined,
  PanicButton: undefined,
  Advices: undefined,
  CreateAdivce: undefined,
  UpdateAdvice: {
    id: string,
  },
  Departments: undefined,
  CreateDepartment: undefined,
  UpdateDepartment: {
    id: string,
  },
  CreateSuggestion: undefined,
  UpdateAccount: undefined,
  CreateContact: undefined,
  UpdateContact: undefined,
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const Router = (): JSX.Element => {
  const { isLoggedIn } = useUser();
  const { colors } = useTheme();
  const styles = routerStyles(colors);

  if (!isLoggedIn) {
    return (
      <Drawer.Navigator screenOptions={styles} initialRouteName="Login">
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: 'Crear contacto',
            swipeEnabled: false,
          }}
        />
        <Drawer.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
            title: 'Crear contacto',
            swipeEnabled: false,
          }}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <Drawer.Navigator screenOptions={styles} initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="Configuration"
        component={Configuration}
        options={{
          title: 'Configuración',
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Cerrar sesión',
        }}
      />
      <Drawer.Screen
        name="PanicButton"
        component={PanicButton}
        options={{
          title: 'Botón de pánico',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="Advices"
        component={Advices}
        options={{
          title: 'Asesorías',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="CreateAdivce"
        component={CreateAdvice}
        options={{
          title: 'Crear asesoría',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="UpdateAdvice"
        component={UpdateAdvice}
        options={{
          title: 'Actualizar asesoría',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="Departments"
        component={Departments}
        options={{
          title: 'Departamentos',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="CreateDepartment"
        component={CreateDepartment}
        options={{
          title: 'Crear departamento',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="UpdateDepartment"
        component={UpdateDepartment}
        options={{
          title: 'Actualizar departamento',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="CreateSuggestion"
        component={Suggestion}
        options={{
          title: 'Crear sugerencia',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="UpdateAccount"
        component={UpdateAccount}
        options={{
          title: 'Actualizar contacto',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="CreateContact"
        component={CreateContact}
        options={{
          title: 'Crear contacto',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
      <Drawer.Screen
        name="UpdateContact"
        component={UpdateContact}
        options={{
          title: 'Actualizar contacto',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default Router;
