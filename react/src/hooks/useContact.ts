import { useState } from 'react';
import { UpdateContactPayload } from 'src/entities/contact';
import { updateContactByID } from 'src/services/contact.service';

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

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
    handleUpdate,
  };
};

export default useContact;
