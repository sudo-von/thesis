import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Advice } from 'src/entities/advice';
import { getAdvices } from 'src/services/advice.service';

const useAdvices = (userID:string) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [advices, setAdvices] = useState<Advice[]>([]);

  const attendedAdvices = advices.filter(
    (advice) => advice.studentsWillAttend.some(
      (studentID) => studentID === userID,
    ),
  );

  const teachedAdvices = advices.filter(
    (advice) => advice.user.id === userID,
  );

  const handleAdvices = async () => {
    try {
      setLoading(true);
      const response:Advice[] = await getAdvices();
      setAdvices(response);
    } catch (e) {
      const error = e as Error;
      Alert.alert('¡Ha ocurrido un error!', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      handleAdvices();
    });
    return willFocusSubscription;
  }, []);

  return {
    loading,
    setLoading,
    advices,
    setAdvices,
    attendedAdvices,
    teachedAdvices,
  };
};

export default useAdvices;
