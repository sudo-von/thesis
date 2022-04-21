import { StyleSheet } from 'react-native';

type NavigationBadgeProps = {
  backgroundColor: string,
};

const navigationCardStyles = ({ backgroundColor }: NavigationBadgeProps) => StyleSheet.create({
  card: {
    marginVertical: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    backgroundColor,
  },
  iconView: {
    width: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentView: {
    width: '85%',
    paddingLeft: 10,
  },
} as const);

export default navigationCardStyles;
