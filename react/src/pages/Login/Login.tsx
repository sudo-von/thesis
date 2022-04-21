import React from 'react';
import {
  Container, Logo, Header, Link, Small, Center,
} from 'src/components';
import LoginForm from 'src/pages/Login/Components/LoginForm/LoginForm';

const logo = require('assets/kyoto-university-logo.png');

const Login = ():JSX.Element => (
  <Container style={{ justifyContent: 'center' }}>
    <Center>
      <Logo
        source={logo}
        size={150}
      />
      <Header
        title="Universidad Autónoma de Kyoto"
        subtitle='"Siempre parece imposible, hasta que se hace".'
      />
    </Center>
    <LoginForm />
    <Center>
      <Small>¿No tienes una cuenta?</Small>
      <Link url="Signup">¡Regístrate aquí!</Link>
    </Center>
  </Container>
);

export default Login;
