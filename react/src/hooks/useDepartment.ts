import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { createDepartment, updateDepartmentByID } from 'src/services/department.service';
import { useNavigation } from '@react-navigation/native';

const useDepartment = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateDepartment = useCallback(async (form, resetForm) => {
    try {
      setError(null);
      setLoading(true);
      await createDepartment({ ...form, cost: parseFloat(form.cost) });
      setLoading(false);
      Alert.alert('¡Felicidades!', '¡Has registrado el departamento con éxito!');
      resetForm();
      navigation.goBack();
    } catch (e) {
      setLoading(false);
      setError((e as Error).message);
    }
  }, []);

  const handleUpdateDepartment = useCallback(async (id, form, resetForm) => {
    try {
      setError(null);
      setLoading(true);
      await updateDepartmentByID(id, { ...form, cost: parseFloat(form.cost) });
      setLoading(false);
      Alert.alert('¡Felicidades!', '¡Has actualizado el departamento con éxito!');
      resetForm();
      navigation.goBack();
    } catch (e) {
      setLoading(false);
      setError((e as Error).message);
    }
  }, []);

  return {
    loading,
    error,
    handleCreateDepartment,
    handleUpdateDepartment,
  };
};

export default useDepartment;
