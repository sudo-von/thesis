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

  const handleDelete = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await deleteDepartmentByID(id);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
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

  return {
    loading,
    error,
    handleEmail,
    handleUpdate,
    handleDeleteModal,
  };
};

export default useDepartmentCard;
