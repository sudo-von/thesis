import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { University } from 'src/entities/university';
import { getUniversityByID } from 'src/services/university.service';

const useSingleUniversity = (id:string) => {
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearState = () => {
    setLoading(false);
    setError(null);
    setUniversity(null);
  };

  const handleSingleUniversity = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getUniversityByID(id);
      setUniversity(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleSingleUniversity();
      return () => clearState();
    }, []),
  );

  return {
    university,
    loading,
    error,
  };
};

export default useSingleUniversity;
