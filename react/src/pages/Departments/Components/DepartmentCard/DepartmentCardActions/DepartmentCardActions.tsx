import React from 'react';
import { Alert, Linking } from 'react-native';
import { FAB, Card } from 'react-native-paper';
import { deleteDepartmentByID } from 'src/services/department.service';
import { useNavigation } from '@react-navigation/native';
import { Department } from 'src/entities/department';
import { BasicUser } from 'src/entities/user';
import departmentCardActionsStyles from './DepartmentCardActions.styles';

type DepartmentCardActionsProps = {
  id: string
  departmentUser: BasicUser,
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>,
  userID: string,
};

const DepartmentCardActions = ({
  id, departmentUser, userID, setDepartments,
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
      setDepartments(
        (departments:Department[]) => departments.filter(
          (department:Department) => department.id !== id,
        ),
      );
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

  return (
    <Card.Actions style={departmentCardActionsStyles.cardActions}>
      { userID !== departmentUser.id
        && <FAB onPress={handleEmail} style={departmentCardActionsStyles.fab} color="#FFFFFF" small icon="email" />}
      { userID === departmentUser.id
        && <FAB onPress={handleEdit} style={departmentCardActionsStyles.fab} color="#FFFFFF" small icon="pencil" />}
      { userID === departmentUser.id
        && <FAB onPress={handleDeleteModal} style={departmentCardActionsStyles.fab} color="#FFFFFF" small icon="delete" />}
    </Card.Actions>
  );
};

export default DepartmentCardActions;
