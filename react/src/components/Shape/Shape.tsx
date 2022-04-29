import React from 'react';
import { View } from 'react-native';
import shapeStyles from './Shape.styles';

export type ShapeProps = {
  backgroundColor: string;
  borderRadius: number;
  size: number;
};

const Shape = (props: ShapeProps): JSX.Element => {
  const styles = shapeStyles(props);
  return (
    <View style={styles.view} />
  );
};

export default Shape;
