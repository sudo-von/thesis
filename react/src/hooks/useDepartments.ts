import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getDepartments } from 'src/services/department.service';
import { useNavigation } from '@react-navigation/native';
import { Department } from 'src/entities/department';

const useDepartments = () => {
  const navigation = useNavigation();
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

  useEffect(() => {
    handleDepartments();
    const willFocusSubscription = navigation.addListener('focus', () => {
      handleDepartments();
    });
    return willFocusSubscription;
  }, []);
  return { loading, departments, setDepartments };
};

export default useDepartments;
