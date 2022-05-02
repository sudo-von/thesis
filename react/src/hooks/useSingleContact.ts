import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Contact } from 'src/entities/contact';
import { getContactByUserID } from 'src/services/contact.service';

const useSingleContact = (userId:string) => {
  const [contact, setContact] = useState<Contact | undefined | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearState = () => {
    setContact(null);
    setLoading(false);
    setError(null);
  };

  const handleSingleContact = async () => {
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
      handleSingleContact();
      return clearState;
    }, []),
  );

  return {
    contact,
    loading,
    error,
  };
};

export default useSingleContact;
