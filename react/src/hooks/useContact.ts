import { useState } from 'react';
import { ContactPayload, UpdateContactPayload } from 'src/entities/contact';
import { createContactByUserID, updateContactByID } from 'src/services/contact.service';

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const handleCreate = async (userID: string, payload:ContactPayload) => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await createContactByUserID(userID, payload);
      setSuccess('¡Has registrado tu contacto con éxito!');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (payload:UpdateContactPayload) => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await updateContactByID(payload.id, payload);
      setSuccess('¡Has actualizado tu contacto con éxito!');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    success,
    loading,
    handleCreate,
    handleUpdate,
  };
};

export default useContact;
