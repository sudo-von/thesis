import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getInstalledApps, createInstalledApp } from 'src/services/app.service';

const useInstalledApps = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const handleInstalledApps = async () => {
    try {
      const response = await getInstalledApps();
      setInstalledApps(response.results);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const handleCreateInstalledApp = async (installedApp:object) => {
    try {
      await createInstalledApp(installedApp)
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    handleInstalledApps();
  }, []);
  return {
    installedApps,
    handleCreateInstalledApp,
  };
};

export default useInstalledApps;
