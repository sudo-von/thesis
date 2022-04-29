import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { getDepartments } from 'src/services/department.service';
import { useFocusEffect } from '@react-navigation/native';
import { Department } from 'src/entities/department';

const useDepartments = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const handleDepartments = async () => {
    try {
      setLoading(true);
      const response = await getDepartments();
      setDepartments(response);
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleDepartments();
      return () => {
        setDepartments([]);
      };
    }, []),
  );

  return { loading, departments, setDepartments };
};

export default useDepartments;
