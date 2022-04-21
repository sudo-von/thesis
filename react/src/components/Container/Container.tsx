import React from 'react';
import { View } from 'react-native';
import { ContainerStyleProps, containerStyles } from './Container.styles';

type ContainerProps = {
  style?: ContainerStyleProps,
  children: React.ReactNode,
};

const Container = ({ children, style = {} }: ContainerProps): JSX.Element => (
  <View style={containerStyles(style).container}>
    {children}
  </View>
);

export default Container;
