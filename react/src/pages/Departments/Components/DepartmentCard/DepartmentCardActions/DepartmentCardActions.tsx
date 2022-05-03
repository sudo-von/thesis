import React from 'react';
import { Card, useTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import departmentCardActionsStyles from './DepartmentCardActions.styles';

type DepartmentCardActionsProps = {
  departmentUserID: string,
  userID: string,
  handleEmail: () => Promise<void>,
  handleUpdate: () => void,
  handleDeleteModal: (handleDepartments: () => Promise<void>) => void,
  handleDepartments: () => Promise<void>,
};

const DepartmentCardActions = ({
  departmentUserID,
  userID,
  handleEmail,
  handleUpdate,
  handleDeleteModal,
  handleDepartments,
}:DepartmentCardActionsProps) => {
  const theme = useTheme();
  return (
    <Card.Actions style={departmentCardActionsStyles.cardActions}>
      { userID !== departmentUserID
          && <MaterialCommunityIcons onPress={handleEmail} name="email-outline" size={24} color={theme.colors.primary} /> }
      { userID === departmentUserID
          && <FontAwesome onPress={handleUpdate} name="edit" size={24} color={theme.colors.primary} /> }
      { userID === departmentUserID
          && <MaterialIcons onPress={() => handleDeleteModal(handleDepartments)} name="delete-outline" size={26} color={theme.colors.primary} /> }
      <MaterialIcons name="search" size={24} color={theme.colors.primary} />
    </Card.Actions>
  );
};

export default DepartmentCardActions;
