import React from 'react';
import { Card, useTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import adviceCardActionsStyles from './AdviceCardActions.styles';

type AdviceCardActionsProps = {
  adviceUserID: string,
  userID: string,
  handleEmail: () => Promise<void>,
  handleUpdate: () => void,
  handleDeleteModal: (handleAdvices: () => Promise<void>) => void,
  handleAdvices: () => Promise<void>,
};

const AdviceCardActions = ({
  adviceUserID, userID, handleEmail, handleUpdate, handleDeleteModal, handleAdvices,
}: AdviceCardActionsProps) => {
  const theme = useTheme();
  return (
    <Card.Actions style={adviceCardActionsStyles.cardActions}>
      { userID !== adviceUserID
          && <MaterialCommunityIcons onPress={handleEmail} name="email-outline" size={24} color={theme.colors.primary} /> }
      { userID === adviceUserID
          && <FontAwesome onPress={handleUpdate} name="edit" size={24} color={theme.colors.primary} /> }
      { userID === adviceUserID
          && <MaterialIcons onPress={() => handleDeleteModal(handleAdvices)} name="delete-outline" size={26} color={theme.colors.primary} /> }
      <MaterialIcons name="search" size={24} color={theme.colors.primary} />
    </Card.Actions>
  );
};

export default AdviceCardActions;
