import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import login from 'src/services/auth.service';
import { signup } from 'src/services/user.service';
import { deleteToken } from 'src/services/token.service';
import { useAuth } from 'src/contexts/auth.context';
import { AuthActionKind } from 'src/reducers/auth.actions';
import { UserPayload } from 'src/entities/user';
import { useNavigation } from '@react-navigation/native';

const useUser = () => {
  const { authState, authDispatch } = useAuth();
  const { user, isLoggedIn } = authState;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigation = useNavigation();

  const handleLogin = useCallback(async (
    { email, password }: { email: string, password: string },
  ) => {
    try {
      setError(null);
      setLoading(true);
      const response = await login({ email, password });
      setLoading(false);
      authDispatch({ type: AuthActionKind.LOGIN, payload: response.user });
      navigation.navigate('Login');
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

  const handleSignup = useCallback(async (payload: UserPayload) => {
    try {
      setError(null);
      setLoading(true);
      await signup(payload);
      setLoading(false);
      Alert.alert('¡Felicidades!', 'Ya puedes iniciar sesión.');
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    setError,
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleSignup,
  };
};

export default useUser;
