import React from 'react';
import { View } from 'react-native';
import styles from './Center.styles';

type CenterProps = {
  children: React.ReactNode,
};

const Center = ({ children }: CenterProps): JSX.Element => (
  <View style={styles.view}>
    {children}
  </View>
);

export default Center;
