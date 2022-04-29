import React from 'react';
import Center from 'src/components/Center/Center';
import Small from 'src/components/Small/Small';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { View } from 'react-native';

type LoaderProps = {
  loadingMessage?: string,
  size?: number,
  showMessage?: boolean,
};

const Loader = ({ loadingMessage = 'Cargando...', size = 80, showMessage = true }: LoaderProps): JSX.Element => {
  const theme = useTheme();
  return (
    <View>
      <ActivityIndicator size={size} color={theme.colors.primary} />
      { showMessage
      && (
      <Center>
        <Small style={{ color: theme.colors.accent }}>{loadingMessage}</Small>
      </Center>
      )}
    </View>
  );
};

export default Loader;
