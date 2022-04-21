import { StyleSheet } from 'react-native';

type LogoStylesProps = {
  size: number,
  colors: ReactNativePaper.ThemeColors,
};

const logoStyles = ({ size, colors }: LogoStylesProps) => StyleSheet.create({
  view: {
    borderRadius: 100,
    width: size,
    height: size,
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: size - 15,
    resizeMode: 'contain',
  },
} as const);

export default logoStyles;
