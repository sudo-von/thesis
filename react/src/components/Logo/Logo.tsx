import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import imageStyles from './Logo.styles';

type LogoProps = {
  source: ImageSourcePropType,
  size: number,
};

const Logo = ({ source, size = 180 }: LogoProps): JSX.Element => {
  const styles = imageStyles(size);
  return (
    <Image
      style={styles.image}
      source={source}
    />
  );
};

export default Logo;
