import React from 'react';
import { Caption } from 'react-native-paper';
import smallStyles from './Small.styles';

type SmallProps = {
  children: React.ReactNode,
  style?: object,
};

const Small = ({ children, style }: SmallProps) => (
  <Caption
    style={{ ...smallStyles.caption, ...style }}
  >
    {children}
  </Caption>
);

export default Small;
