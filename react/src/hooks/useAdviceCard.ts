import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteAdviceByID } from 'src/services/advice.service';

const useAdviceCard = (id:string, email:string) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEmail = async (): Promise<void> => {
    await Linking.openURL(`mailto:${email}`);
  };

  const handleUpdate = (): void => {
    navigation.navigate('UpdateAdvice', { id });
  };

  const handleDelete = async (handleAdvices: () => Promise<void>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await deleteAdviceByID(id);
      setLoading(false);
      setSuccess('¡Has eliminado la asesoría con éxito!');
      handleAdvices();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  };

  const handleDeleteModal = (handleAdvices: () => Promise<void>) => {
    Alert.alert(
      '¿Quieres eliminar esta asesoría?',
      'Recuerda que esta acción no podrá ser revertida.',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          onPress: () => handleDelete(handleAdvices),
        },
      ],
    );
  };

  return {
    error,
    success,
    loading,
    handleEmail,
    handleUpdate,
    handleDeleteModal,
  };
};

export default useAdviceCard;
