import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Caption, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import navigationBadgeStyles from './NavigationBadge.styles';

type NavigationBadgeProps = {
  url: string,
  title: string,
  icon: string,
  color: string,
  backgroundColor: string,
};

const NavigationBadge = ({
  url, title, icon, color, backgroundColor,
}: NavigationBadgeProps) => {
  const navigation = useNavigation();
  const handleNavigation = () => navigation.navigate(url);
  return (
    <TouchableHighlight onPress={handleNavigation} underlayColor="white">
      <View style={navigationBadgeStyles(backgroundColor).view}>
        <IconButton icon={icon} color={color} />
        <Caption>{title}</Caption>
      </View>
    </TouchableHighlight>
  );
};

export default NavigationBadge;
