import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { Department } from 'src/entities/department';
import { getDepartmentByID } from 'src/services/department.service';

export const useSingleDepartment = (id:string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [department, setDepartment] = useState<Department>();

  const handleDepartmentByID = useCallback(async () => {
    try {
      setLoading(true);
      const response:Department = await getDepartmentByID(id);
      setDepartment(response);
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleDepartmentByID();
  }, []);

  return {
    loading,
    department,
    setDepartment,
  };
};

export default useSingleDepartment;
