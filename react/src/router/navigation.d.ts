import { DrawerParamList } from './router';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}
