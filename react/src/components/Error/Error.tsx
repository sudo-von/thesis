import React, { useState } from 'react';
import {
  Button, Paragraph, Dialog, Portal, useTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Bold from '../Bold/Bold';
import errorStyles from './Error.styles';

type ErrorProps = {
  message: string,
};

const Error = ({ message }: ErrorProps): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const hideError = () => setVisible(false);
  const theme = useTheme();
  const styles = errorStyles(theme.colors.error);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideError}>
        <Dialog.Content style={styles.content}>
          <View style={styles.view}>
            <Ionicons name="alert-circle" size={28} color={theme.colors.error} />
            <Paragraph style={styles.title}>
              <Bold>¡Ha ocurrido un error!</Bold>
            </Paragraph>
          </View>
          <Paragraph style={styles.message}>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideError} color={theme.colors.primary}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Error;
