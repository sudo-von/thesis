import React from 'react';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import useUser from 'src/hooks/useUser';
import PrivateRouter from 'src/router/Components/PrivateRouter/PrivateRouter';
import PublicRouter from 'src/router/Components/PublicRouter/PublicRouter';

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

export type Route = {
  name: keyof DrawerParamList,
  component: React.ComponentType<any>,
  options?: DrawerNavigationOptions,
};

const Router = (): JSX.Element => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return (
      <PrivateRouter />
    );
  }

  return (
    <PublicRouter />
  );
};

export default Router;
