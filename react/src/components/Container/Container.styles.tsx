import { StyleSheet } from 'react-native';

export type ContainerStyleProps = {
  justifyContent?: 'center' | 'flex-end' | 'flex-start',
  padding?: number,
  backgroundColor?: string,
};

export const containerStyles = (
  { justifyContent = 'center', padding = 25, backgroundColor = '#f5f6fb' }: ContainerStyleProps,
) => StyleSheet.create({
  container: {
    flex: 1,
    padding,
    justifyContent,
    backgroundColor,
  },
} as const);
