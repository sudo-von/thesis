import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Contact } from 'src/entities/contact';
import { getContactByUserID } from 'src/services/contact.service';

const useContactByUserId = (userId:string) => {
  const [contact, setContact] = useState<Contact | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearState = () => {
    setContact(null);
    setError(null);
    setLoading(true);
  };

  const handleContactByUserId = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const response = await getContactByUserID(userId);
      setContact(response);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleContactByUserId();
      return clearState;
    }, []),
  );

  return {
    contact,
    loading,
    error,
  };
};

export default useContactByUserId;
