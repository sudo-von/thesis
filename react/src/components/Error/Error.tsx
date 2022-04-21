import React from 'react';
import { Text, View } from 'react-native';
import errorStyles from './Error.styles';

type ErrorProps = {
  message: string,
};

const Error = ({ message }: ErrorProps): JSX.Element => (
  <View style={errorStyles.container}>
    <Text style={errorStyles.text}>{message}</Text>
  </View>
);

export default Error;
