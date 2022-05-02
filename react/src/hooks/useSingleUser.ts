import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { TinyUser } from 'src/entities/user';
import { getUserByID } from 'src/services/user.service';

const useSingleUser = (userId:string) => {
  const [user, setUser] = useState<TinyUser | undefined | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearState = () => {
    setLoading(false);
    setError(null);
    setUser(null);
  };

  const handleSingleUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserByID(userId);
      setUser(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleSingleUser();
      return () => clearState();
    }, []),
  );

  return {
    user,
    loading,
    error,
  };
};

export default useSingleUser;
