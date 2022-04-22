import { StyleSheet } from 'react-native';

export type ContainerStyleProps = {
  justifyContent?: 'center' | 'flex-end' | 'flex-start',
  alignItems?: 'center',
  padding?: number,
  backgroundColor?: string,
};

export const containerStyles = (
  {
    justifyContent, padding, backgroundColor,
  }: ContainerStyleProps,
) => StyleSheet.create({
  container: {
    flex: 1,
    padding,
    justifyContent,
    backgroundColor,
  },
} as const);
