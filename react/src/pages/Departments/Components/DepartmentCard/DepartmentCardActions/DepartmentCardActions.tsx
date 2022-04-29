import React from 'react';
import { Alert, Linking } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { deleteDepartmentByID } from 'src/services/department.service';
import { useNavigation } from '@react-navigation/native';
import { BasicUser } from 'src/entities/user';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import departmentCardActionsStyles from './DepartmentCardActions.styles';

type DepartmentCardActionsProps = {
  id: string
  departmentUser: BasicUser,
  userID: string,
};

const DepartmentCardActions = ({
  id, departmentUser, userID,
}:DepartmentCardActionsProps) => {
  const navigation = useNavigation();

  const handleEmail = async (): Promise<void> => {
    await Linking.openURL(`mailto:${departmentUser.email}`);
  };

  const handleEdit = (): void => {
    navigation.navigate('UpdateDepartment', { id });
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteDepartmentByID(id);
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    }
  };

  const handleDeleteModal = () => {
    Alert.alert(
      '¿Quieres eliminar este departamento?',
      'Recuerda que esta acción no podrá ser revertida.',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          onPress: handleDelete,
        },
      ],
    );
  };

  const theme = useTheme();
  return (
    <Card.Actions style={departmentCardActionsStyles.cardActions}>
      { userID !== departmentUser.id
        && <MaterialCommunityIcons onPress={handleEmail} name="email-outline" size={24} color={theme.colors.primary} /> }
      { userID === departmentUser.id
        && <FontAwesome onPress={handleEdit} name="edit" size={24} color={theme.colors.primary} /> }
      { userID === departmentUser.id
        && <MaterialIcons onPress={handleDeleteModal} name="delete-outline" size={26} color={theme.colors.primary} /> }
      <MaterialIcons name="search" size={24} color={theme.colors.primary} />
    </Card.Actions>
  );
};

export default DepartmentCardActions;
