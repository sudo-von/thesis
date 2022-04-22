import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';
import {
  Container, Logo, Small, Center, Error,
} from 'src/components';
import useUser from 'src/hooks/useUser';
import LoginForm from 'src/pages/Login/Components/LoginForm/LoginForm';
import loginStyles from './Login.styles';

const logo = require('assets/logo/logo.png');

const Login = ():JSX.Element => {
  const { loading, error, handleLogin } = useUser();
  const theme = useTheme();
  const navigation = useNavigation();
  const handleNavigation = () => navigation.navigate('Signup');
  const styles = loginStyles(theme.colors.primary);
  return (
    <Container>
      <Center>
        <Logo source={logo} size={150} />
      </Center>
      <LoginForm
        loading={loading}
        handleLogin={handleLogin}
      />
      { error && <Error message={error} /> }
      <TouchableOpacity onPress={handleNavigation}>
        <Center>
          <Small>¿No tienes una cuenta?</Small>
          <Text style={styles.text}>¡Regístrate aquí!</Text>
        </Center>
      </TouchableOpacity>
    </Container>
  );
};

export default Login;
