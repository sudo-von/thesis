import React, { useReducer } from 'react';
import { AuthContext, initialAuthState } from 'src/contexts/auth.context';
import authReducer from 'src/reducers/auth.reducer';

type AuthProviderProps = {
  children: React.ReactNode,
};

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  return (
    /* TODO: Add useMemo. */
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
