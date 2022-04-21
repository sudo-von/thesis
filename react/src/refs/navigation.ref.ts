import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import { DrawerParamList } from 'src/router/router';

const navigationRef = createRef<NavigationContainerRef<DrawerParamList>>();

const navigate = (name:keyof DrawerParamList) => {
  navigationRef.current?.navigate<keyof DrawerParamList>(name);
};

export {
  navigationRef,
  navigate,
};
