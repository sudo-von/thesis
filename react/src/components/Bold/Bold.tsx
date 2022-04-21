import React from 'react';
import { Text } from 'react-native';
import boldStyles from './Bold.styles';

type BoldProps = {
  children: React.ReactNode,
};

const Bold = ({ children } : BoldProps): JSX.Element => (
  <Text style={boldStyles.text}>
    {children}
  </Text>
);

export default Bold;
