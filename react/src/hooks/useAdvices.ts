import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { Advice } from 'src/entities/advice';
import { getAdvices, updateStudentsNumber } from 'src/services/advice.service';

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

  const handleStudentsWillAttend = (studdentsWillAttend:string[], userId:string) => (
    studdentsWillAttend.some((id) => id === userId)
      ? studdentsWillAttend.filter((id) => (id) !== userId)
      : [...studdentsWillAttend, userId]);

  const handleAssist = async (adviceId:string, userId:string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await updateStudentsNumber(adviceId);
      setAdvices((currentAdvices) => currentAdvices.map((advice) => ((advice.id === adviceId) ? ({
        ...advice,
        studentsWillAttend: handleStudentsWillAttend(advice.studentsWillAttend, userId),
      })
        : advice)));
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
    handleAssist,
  };
};

export default useAdvices;
