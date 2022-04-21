import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import login from 'src/services/auth.service';
import { signup } from 'src/services/user.service';
import { deleteToken } from 'src/services/token.service';
import { useAuth } from 'src/contexts/auth.context';
import { AuthActionKind } from 'src/reducers/auth.actions';

const useUser = () => {
  const { authState, authDispatch } = useAuth();
  const { user, isLoggedIn } = authState;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      setError(null);
      setLoading(true);
      const response = await login({ email, password });
      setLoading(false);
      authDispatch({ type: AuthActionKind.LOGIN, payload: response.user });
    } catch (e) {
      setLoading(false);
      setError((e as Error).message);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await deleteToken();
      authDispatch({ type: AuthActionKind.LOGOUT });
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  const handleSignup = useCallback(async (form, { resetForm }, navigation) => {
    try {
      setError(null);
      setLoading(true);
      await signup(form);
      setLoading(false);
      resetForm();
      Alert.alert('¡Felicidades!', 'Ya puedes iniciar sesión.');
      navigation.navigate('Login');
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleSignup,
  };
};

export default useUser;
