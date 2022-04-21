import React from 'react';
import { Link as NativeLink } from '@react-navigation/native';
import { useTheme, Caption } from 'react-native-paper';
import { DrawerParamList } from 'src/router/router';
import linkStyles from './Link.styles';

type LinkProps = {
  url: keyof DrawerParamList,
  params?: object,
  children: React.ReactNode,
};

const Link = ({ url, params, children }: LinkProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <NativeLink to={{ screen: url, params }}>
      <Caption style={linkStyles(colors).caption}>
        {children}
      </Caption>
    </NativeLink>
  );
};

export default Link;
