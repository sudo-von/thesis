import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import sendSuggestion from 'src/services/suggestion.service';

const useSuggestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestion = useCallback(async (form, { resetForm }) => {
    try {
      setError(null);
      setLoading(true);
      await sendSuggestion(form);
      Alert.alert('¡Felicidades!', '¡Has enviado tu sugerencia con éxito!');
      resetForm();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    handleSuggestion,
  };
};

export default useSuggestion;
