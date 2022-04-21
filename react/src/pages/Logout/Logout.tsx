import React, { useEffect } from 'react';
import { Loader } from 'src/components';
import useUser from 'src/hooks/useUser';

const LogoutPage = () => {
  const { handleLogout } = useUser();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Loader size={85} loadingMessage="Cerrando sesión..." />
  );
};

export default LogoutPage;
