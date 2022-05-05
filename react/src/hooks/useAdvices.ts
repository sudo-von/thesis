import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { Advice } from 'src/entities/advice';
import { getAdvices } from 'src/services/advice.service';

const useAdvices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advices, setAdvices] = useState<Advice[]>([]);

  const clearState = () => {
    setLoading(false);
    setAdvices([]);
    setError(null);
  };

  const handleAdvices = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const response = await getAdvices();
      setAdvices(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleAdvices();
      return clearState;
    }, []),
  );

  return {
    error,
    loading,
    setLoading,
    advices,
    setAdvices,
    handleAdvices,
  };
};

export default useAdvices;
