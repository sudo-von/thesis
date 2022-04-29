import { StyleSheet } from 'react-native';

export type ShapeStylesProps = {
  backgroundColor: string;
  borderRadius: number;
  size: number;
};

const shapeStyles = ({
  backgroundColor,
  borderRadius,
  size,
} : ShapeStylesProps) => StyleSheet.create({
  view: {
    backgroundColor,
    height: size,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
} as const);

export default shapeStyles;
