import { useCallback, useState } from 'react';
import { getDepartments } from 'src/services/department.service';
import { useFocusEffect } from '@react-navigation/native';
import { Department } from 'src/entities/department';

const useDepartments = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);

  const clearState = () => {
    setLoading(false);
    setDepartments([]);
    setError(null);
  };

  const handleDepartments = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const response = await getDepartments();
      setDepartments(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleDepartments();
      return clearState;
    }, []),
  );

  return {
    error,
    loading,
    departments,
    handleDepartments,
    setDepartments,
  };
};

export default useDepartments;
