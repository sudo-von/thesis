import { useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { AdvicePayload, UpdateAdvicePayload } from 'src/entities/advice';
import { createAdvice, updateAdviceByID } from 'src/services/advice.service';

export const useAdvice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleCreateAdvice = useCallback(async (
    advicePayload:AdvicePayload,
  ): Promise<void> => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await createAdvice(advicePayload);
      setLoading(false);
      setSuccess('¡Has registrado una asesoría con éxito!');
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }, []);

  const handleUpdateAdvice = useCallback(async (
    departmentPayload:UpdateAdvicePayload,
  ): Promise<void> => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await updateAdviceByID(departmentPayload);
      setLoading(false);
      setSuccess('¡Has actualizado la asesoría con éxito!');
      navigation.goBack();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    success,
    handleCreateAdvice,
    handleUpdateAdvice,
  };
};

export default useAdvice;
