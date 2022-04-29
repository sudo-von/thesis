import React from 'react';
import { Card, useTheme } from 'react-native-paper';
import { BasicUser } from 'src/entities/user';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import useDepartmentCard from 'src/hooks/useDepartmentCard';
import { Error, Loader } from 'src/components';
import { View } from 'react-native';
import departmentCardActionsStyles from './DepartmentCardActions.styles';

type DepartmentCardActionsProps = {
  id: string
  departmentUser: BasicUser,
  userID: string,
};

const DepartmentCardActions = ({
  id, departmentUser, userID,
}:DepartmentCardActionsProps) => {
  const {
    loading,
    error,
    handleEmail,
    handleUpdate,
    handleDeleteModal,
  } = useDepartmentCard(id, departmentUser.email);

  const theme = useTheme();

  if (loading) {
    return (
      <View style={{ marginBottom: 20 }}>
        <Loader size={20} showMessage={false} />
      </View>
    );
  }

  return (
    <Card.Actions style={departmentCardActionsStyles.cardActions}>
      { userID !== departmentUser.id
        && <MaterialCommunityIcons onPress={handleEmail} name="email-outline" size={24} color={theme.colors.primary} /> }
      { userID === departmentUser.id
        && <FontAwesome onPress={handleUpdate} name="edit" size={24} color={theme.colors.primary} /> }
      { userID === departmentUser.id
        && <MaterialIcons onPress={handleDeleteModal} name="delete-outline" size={26} color={theme.colors.primary} /> }
      { error
      && <Error message={error} /> }
      <MaterialIcons name="search" size={24} color={theme.colors.primary} />
    </Card.Actions>
  );
};

export default DepartmentCardActions;
