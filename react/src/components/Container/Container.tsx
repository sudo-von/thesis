import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ContainerStyleProps, containerStyles } from './Container.styles';

type ContainerProps = {
  style?: ContainerStyleProps,
  children: React.ReactNode,
};

const Container = ({ children, style = {} }: ContainerProps): JSX.Element => {
  const theme = useTheme();
  const defaultStyle: ContainerStyleProps = {
    justifyContent: 'center',
    padding: 25,
    backgroundColor: theme.colors.background,
    ...style,
  };
  const styles = containerStyles(defaultStyle);
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default Container;
