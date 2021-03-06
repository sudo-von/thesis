/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import { DrawerParamList, Route } from 'src/router/Router';
import Logout from 'src/pages/Logout/Logout';
import Home from 'src/pages/Home/Home';
import PanicButton from 'src/pages/PanicButton/PanicButton';
import Advices from 'src/pages/Advices/Advices';
import Departments from 'src/pages/Departments/Departments';
import CreateDepartment from 'src/pages/CreateDepartment/CreateDepartment';
import UpdateDepartment from 'src/pages/UpdateDepartment/UpdateDepartment';
import DepartmentDetail from 'src/pages/DepartmentDetail/DepartmentDetail';
import CreateAdvice from 'src/pages/CreateAdvice/CreateAdvice';
import UpdateAdvice from 'src/pages/UpdateAdvice/UpdateAdvice';
import Suggestion from 'src/pages/Suggestion/Suggestion';
import Configuration from 'src/pages/Configuration/Configuration';
import UpdateAccount from 'src/pages/UpdateAccount/UpdateAccount';
import CreateContact from 'src/pages/CreateContact/CreateContact';
import UpdateContact from 'src/pages/UpdateContact/UpdateContact';
import DrawerContent from 'src/router/Components/DrawerContent/DrawerContent';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BackButton from 'src/router/Components/BackButton/BackButton';
import { BATTERY_TASK, handleBatteryBackgroundTask, registerBackgroundTask } from 'src/services/background.service';
import * as TaskManager from 'expo-task-manager';
import privateRouterStyles from './PrivateRouter.styles';
import AddButton from '../AddButton/AddButton';

TaskManager.defineTask(BATTERY_TASK, handleBatteryBackgroundTask);

const routes: Route[] = [
  {
    name: 'Home',
    component: Home,
    options: {
      title: 'Inicio',
      drawerIcon: ({ color }: { color: string }) => (
        <Ionicons name="home-outline" size={20} color={color} />
      ),
    },
  },
  {
    name: 'Configuration',
    component: Configuration,
    options: {
      title: 'Configuraci??n',
      drawerIcon: ({ color }: { color: string }) => (
        <Ionicons name="settings-outline" size={20} color={color} />
      ),
    },
  },
  {
    name: 'Logout',
    component: Logout,
    options: {
      title: 'Cerrar sesi??n',
      headerShown: false,
      swipeEnabled: false,
      drawerIcon: ({ color }: { color: string }) => (
        <MaterialIcons name="logout" size={20} color={color} />
      ),
    },
  },
  {
    name: 'PanicButton',
    component: PanicButton,
    options: {
      title: 'Bot??n de p??nico',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'Advices',
    component: Advices,
    options: {
      title: 'Asesor??as',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
      headerRight: () => AddButton('CreateAdivce'),
    },
  },
  {
    name: 'CreateAdivce',
    component: CreateAdvice,
    options: {
      title: 'Crear asesor??a',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'UpdateAdvice',
    component: UpdateAdvice,
    options: {
      title: 'Actualizar asesor??a',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'Departments',
    component: Departments,
    options: {
      title: 'Departamentos',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
      headerRight: () => AddButton('CreateDepartment'),
    },
  },
  {
    name: 'CreateDepartment',
    component: CreateDepartment,
    options: {
      title: 'Crear departamento',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'UpdateDepartment',
    component: UpdateDepartment,
    options: {
      title: 'Actualizar departamento',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'DepartmentDetail',
    component: DepartmentDetail,
    options: {
      title: 'Detalle del departamento',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'CreateSuggestion',
    component: Suggestion,
    options: {
      title: 'Crear sugerencia',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'UpdateAccount',
    component: UpdateAccount,
    options: {
      title: 'Actualizar contacto',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'CreateContact',
    component: CreateContact,
    options: {
      title: 'Crear contacto',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
  {
    name: 'UpdateContact',
    component: UpdateContact,
    options: {
      title: 'Actualizar contacto',
      drawerItemStyle: {
        height: 0,
      },
      headerLeft: BackButton,
    },
  },
];

const Drawer = createDrawerNavigator<DrawerParamList>();

const PrivateRouter = (): JSX.Element => {
  const { colors } = useTheme();
  const styles = privateRouterStyles(colors);
  const handleDrawerContent = (props) => <DrawerContent {...props} />;

  useEffect(() => {
    registerBackgroundTask(BATTERY_TASK, 300);
    return () => {
      TaskManager.unregisterAllTasksAsync();
    };
  }, []);

  return (
    <Drawer.Navigator screenOptions={styles} backBehavior="history" initialRouteName="Home" drawerContent={handleDrawerContent}>
      {
        routes.map((route) => (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      }
    </Drawer.Navigator>
  );
};

export default PrivateRouter;
