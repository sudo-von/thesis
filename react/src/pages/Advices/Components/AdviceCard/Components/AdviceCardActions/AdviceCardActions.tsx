import React from 'react';
import { Card, useTheme } from 'react-native-paper';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import adviceCardActionsStyles from './AdviceCardActions.styles';

type AdviceCardActionsProps = {
  userID: string,
  adviceId: string,
  adviceUserID: string,
  studentsWillAttend: string[],
  handleEmail: () => Promise<void>,
  handleUpdate: () => void,
  handleAdvices: () => Promise<void>,
  handleAssist: (adviceId:string, userId:string) => Promise<void>,
  handleDeleteModal: (handleAdvices: () => Promise<void>) => void,
};

const AdviceCardActions = ({
  userID,
  adviceId,
  adviceUserID,
  handleEmail,
  handleAssist,
  handleUpdate,
  handleAdvices,
  handleDeleteModal,
  studentsWillAttend,
}: AdviceCardActionsProps) => {
  const theme = useTheme();
  return (
    <Card.Actions style={adviceCardActionsStyles.cardActions}>
      { userID !== adviceUserID
          && <MaterialCommunityIcons onPress={handleEmail} name="email-outline" size={24} color={theme.colors.primary} /> }
      { userID === adviceUserID
          && <FontAwesome onPress={handleUpdate} name="edit" size={24} color={theme.colors.primary} /> }
      { userID === adviceUserID
          && <MaterialIcons onPress={() => handleDeleteModal(handleAdvices)} name="delete-outline" size={24} color={theme.colors.primary} /> }
      { (userID !== adviceUserID)
        && (studentsWillAttend.some((studentId) => studentId === userID)
          ? <AntDesign name="like1" size={24} color={theme.colors.primary} onPress={() => handleAssist(adviceId, userID)} />
          : <AntDesign name="like2" size={24} color={theme.colors.primary} onPress={() => handleAssist(adviceId, userID)} />
        )}
    </Card.Actions>
  );
};

export default AdviceCardActions;
