import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteDepartmentByID } from 'src/services/department.service';

const useDepartmentCard = (id:string, email:string) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmail = async (): Promise<void> => {
    await Linking.openURL(`mailto:${email}`);
  };

  const handleUpdate = (): void => {
    navigation.navigate('UpdateDepartment', { id });
  };

  const handleDetail = (): void => {
    navigation.navigate('DepartmentDetail', { id });
  };

  const handleDelete = async (handleDepartments: () => Promise<void>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await deleteDepartmentByID(id);
      setLoading(false);
      handleDepartments();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  const handleDeleteModal = (handleDepartments: () => Promise<void>) => {
    Alert.alert(
      '¿Quieres eliminar este departamento?',
      'Recuerda que esta acción no podrá ser revertida.',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          onPress: () => handleDelete(handleDepartments),
        },
      ],
    );
  };

  return {
    loading,
    error,
    handleEmail,
    handleDetail,
    handleUpdate,
    handleDeleteModal,
  };
};

export default useDepartmentCard;
