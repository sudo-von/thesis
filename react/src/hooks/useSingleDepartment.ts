import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { Department, UpdateDepartmentPayload } from 'src/entities/department';
import { getDepartmentByID, updateDepartmentByID } from 'src/services/department.service';

export const useSingleDepartment = (id:string) => {
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState<Department | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleSingleDepartment = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getDepartmentByID(id);
      setDepartment(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateDepartment = useCallback(async (
    departmentPayload:UpdateDepartmentPayload,
  ): Promise<void> => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await updateDepartmentByID(departmentPayload);
      setLoading(false);
      setSuccess('¡Has actualizado el departamento con éxito!');
      navigation.goBack();
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleSingleDepartment();
      return () => {
        setDepartment(null);
      };
    }, []),
  );

  return {
    error,
    loading,
    success,
    department,
    setDepartment,
    handleUpdateDepartment,
  };
};

export default useSingleDepartment;
