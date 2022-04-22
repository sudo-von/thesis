import React from 'react';
import { View } from 'react-native';
import { Title, Caption } from 'react-native-paper';
import Bold from 'src/components/Bold/Bold';
import Center from '../Center/Center';
import headerStyles from './Header.styles';

type HeaderProps = {
  title: string,
  subtitle: string,
};

const Header = ({ title, subtitle }: HeaderProps): JSX.Element => (
  <View style={headerStyles.container}>
    <Center>
      <Title><Bold>{title}</Bold></Title>
      <Caption style={headerStyles.subtitle}>{subtitle}</Caption>
    </Center>
  </View>
);

export default Header;
