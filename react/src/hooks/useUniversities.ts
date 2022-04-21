import { useState, useEffect } from 'react';
import { University } from 'src/entities/university';
import { getUniversities } from 'src/services/university.service';

const useUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUniversities = async () => {
    try {
      setLoading(true);
      const universityList:University[] = await getUniversities();
      setUniversities(universityList);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUniversities();
  }, []);

  return {
    universities,
    loading,
    error,
  };
};

export default useUniversities;
