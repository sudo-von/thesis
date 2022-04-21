import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getMood, createMood } from 'src/services/mood.service';

const useMood = (initialMoodValue:number, userId:string) => {
  const [mood, setMood] = useState(initialMoodValue);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleMood = async () => {
    try {
      setLoading(true);
      await getMood(userId);
    } catch (error) {
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMood = async () => {
    try {
      setLoading(true);
      await createMood(userId, { mood });
    } catch (error) {
      Alert.alert('¡Ha ocurrido un error!', error.message);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  const handleShow = (showw:boolean) => setShow(showw);
  useEffect(() => {
    handleMood();
  }, []);

  return {
    loading,
    mood,
    show,
    setMood,
    handleShow,
    handleUpdateMood,
  };
};

export default useMood;
