import { useCallback, useState } from 'react';
import { SuggestionPayload } from 'src/entities/suggestion';
import sendSuggestion from 'src/services/suggestion.service';

const useSuggestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSuggestion = useCallback(async (suggestion:SuggestionPayload): Promise<void> => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      await sendSuggestion(suggestion);
      setSuccess('¡Has enviado tu sugerencia con éxito!');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    setError,
    success,
    handleSuggestion,
  };
};

export default useSuggestion;
