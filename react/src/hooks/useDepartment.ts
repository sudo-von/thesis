import { useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { DepartmentPayload, UpdateDepartmentPayload } from 'src/entities/department';
import { createDepartment, updateDepartmentByID } from 'src/services/department.service';

export const useDepartment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleCreateDepartment = useCallback(async (
    departmentPayload:DepartmentPayload,
  ): Promise<void> => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await createDepartment(departmentPayload);
      setLoading(false);
      setSuccess('¡Has registrado un departamento con éxito!');
      navigation.goBack();
    } catch (e) {
      setError((e as Error).message);
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

  return {
    error,
    loading,
    success,
    handleCreateDepartment,
    handleUpdateDepartment,
  };
};

export default useDepartment;
