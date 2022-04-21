import { StyleSheet } from 'react-native';

type NavigationBadgeProps = {
  backgroundColor: string,
};

const navigationBadgeStyles = ({ backgroundColor }: NavigationBadgeProps) => StyleSheet.create({
  view: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 50,
    backgroundColor,
  },
} as const);

export default navigationBadgeStyles;
