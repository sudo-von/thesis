import React, { useState } from 'react';
import {
  Button, Paragraph, Dialog, Portal, useTheme,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Bold from '../Bold/Bold';
import successStyles from './Success.styles';

type SuccessProps = {
  message: string,
};

const Success = ({ message }: SuccessProps): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const hideSuccess = () => setVisible(false);
  const theme = useTheme();
  const styles = successStyles(theme.colors.primary);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideSuccess}>
        <Dialog.Content style={styles.content}>
          <View style={styles.view}>
            <MaterialIcons name="done" size={28} color={theme.colors.primary} />
            <Paragraph style={styles.title}>
              <Bold>¡Felicidades!</Bold>
            </Paragraph>
          </View>
          <Paragraph style={styles.message}>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideSuccess} color={theme.colors.primary}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Success;
