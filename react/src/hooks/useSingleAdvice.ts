import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Advice, UpdateAdvicePayload } from 'src/entities/advice';
import { getAdviceByID, updateAdviceByID } from 'src/services/advice.service';

const useSingleAdvice = (id:string) => {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigation = useNavigation();

  const clearState = () => {
    setLoading(false);
    setError(null);
    setAdvice(null);
  };

  const handleSingleAdvice = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getAdviceByID(id);
      setAdvice(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAdvice = useCallback(async (
    advicePayload:UpdateAdvicePayload,
  ): Promise<void> => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await updateAdviceByID(advicePayload);
      setLoading(false);
      setSuccess('¡Has actualizado la asesoría con éxito!');
      navigation.goBack();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleSingleAdvice();
      return () => clearState();
    }, []),
  );

  return {
    success,
    advice,
    loading,
    error,
    handleUpdateAdvice,
  };
};

export default useSingleAdvice;
