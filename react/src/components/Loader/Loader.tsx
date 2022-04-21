import React from 'react';
import Container from 'src/components/Container/Container';
import Center from 'src/components/Center/Center';
import Small from 'src/components/Small/Small';
import { ActivityIndicator } from 'react-native-paper';

type LoaderProps = {
  loadingMessage: string,
  size?: number,
};

const Loader = ({ loadingMessage = 'Cargando...', size = 80 }: LoaderProps): JSX.Element => (
  <Container style={{ justifyContent: 'center' }}>
    <ActivityIndicator size={size} />
    <Center>
      <Small>{loadingMessage}</Small>
    </Center>
  </Container>
);

export default Loader;
