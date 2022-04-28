import { DrawerParamList } from 'src/router/Router';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
