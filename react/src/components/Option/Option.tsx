import React from 'react';
import { View, Text, Image } from 'react-native';
import optionStyles from './Option.styles';

type OptionProps = {
  source: string,
  label: string,
};

const Option = ({ source, label }: OptionProps): JSX.Element => (
  <View style={optionStyles.view}>
    <Image style={optionStyles.image} source={{ uri: source }} />
    <Text>{label}</Text>
  </View>
);

export default Option;
