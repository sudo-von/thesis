import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { useTheme } from 'react-native-paper';
import logoStyles from './Logo.styles';

type LogoProps = {
  source: ImageSourcePropType,
  size: number,
};

const Logo = ({ source, size = 180 }: LogoProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <View style={logoStyles({ size, colors }).view}>
      <Image
        style={logoStyles({ size, colors }).image}
        source={source}
      />
    </View>
  );
};

export default Logo;
