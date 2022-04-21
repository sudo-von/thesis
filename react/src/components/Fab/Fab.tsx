import React from 'react';
import { FAB as PaperFab, useTheme } from 'react-native-paper';
import fabStyles from './Fab.styles';

type FabProps = {
  icon: string,
  small?: boolean,
  onPress?: () => void,
};

const Fab = ({ icon = 'home', small = false, onPress }: FabProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <PaperFab
      style={fabStyles(colors).fab}
      color={colors.background}
      icon={icon}
      small={small}
      onPress={onPress}
    />
  );
};

export default Fab;
