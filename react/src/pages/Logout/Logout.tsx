import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Loader } from 'src/components';
import useUser from 'src/hooks/useUser';
import logoutStyles from './Logout.styles';

const LogoutPage = () => {
  const { handleLogout } = useUser();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View style={logoutStyles.loader}>
      <Loader size={85} loadingMessage="Cerrando sesión..." />
    </View>
  );
};

export default LogoutPage;
