import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import login from 'src/services/auth.service';
import { signup, updateUserByID } from 'src/services/user.service';
import { deleteToken } from 'src/services/token.service';
import { useAuth } from 'src/contexts/auth.context';
import { AuthActionKind } from 'src/reducers/auth.actions';
import { UpdateUserPayload, UserPayload } from 'src/entities/user';

const useUser = () => {
  const { authState, authDispatch } = useAuth();
  const { user, isLoggedIn } = authState;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const handleLogin = useCallback(async (
    { email, password }: { email: string, password: string },
  ) => {
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
      authDispatch({ type: AuthActionKind.LOGOUT, payload: user });
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

  const handleUpdate = async (payload:UpdateUserPayload) => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);
      await updateUserByID(payload.id, payload);
      setSuccess('¡Has actualizado tus datos con éxito!');
      authDispatch({ type: AuthActionKind.UPDATE, payload: { ...user, userName: payload.name } });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    error,
    success,
    loading,
    setError,
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleSignup,
    handleUpdate,
  };
};

export default useUser;
