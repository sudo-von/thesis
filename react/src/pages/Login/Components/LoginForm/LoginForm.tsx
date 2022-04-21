import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import {
  Button, Error, Input, PasswordInput,
} from 'src/components';
import useUser from 'src/hooks/useUser';
import loginFormStyles from './LoginForm.styles';

export type LoginFormFields = {
  email?: string,
  password?: string,
};

const LoginForm = () => {
  const { loading, error, handleLogin } = useUser();

  const initialValues:LoginFormFields = {
    email: 'martinez-angel@uadec.edu.mx',
    password: 'college-app',
  };

  const handleValidation = ({ email, password }:LoginFormFields): LoginFormFields => {
    const errors: LoginFormFields = {};
    if (!email) {
      errors.email = 'Correo requerido';
    }
    if (!password) {
      errors.password = 'Contraseña requerida';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={handleLogin}
      validateOnChange
      validateOnBlur
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }) => (
        <View style={loginFormStyles.container}>
          <Input
            label="Ingresa tu correo"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={errors.email}
          />
          <PasswordInput
            label="Ingresa tu contraseña"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={errors.password}
          />
          { error
            && <Error message={error} />}
          <Button
            loading={loading}
            loadingMessage="Iniciando sesión"
            style={loginFormStyles.button}
            onPress={handleSubmit}
          >
            Iniciar sesión
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
