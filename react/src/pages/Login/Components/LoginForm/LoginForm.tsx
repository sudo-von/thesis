import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import {
  Button, Input, PasswordInput,
} from 'src/components';
import loginFormStyles from './LoginForm.styles';

type LoginFormProps = {
  loading: boolean,
  handleLogin: ({ email, password }: { email: string, password: string }) => Promise<void>,
};

export type LoginFormFields = {
  email?: string,
  password?: string,
};

const LoginForm = ({ loading, handleLogin }: LoginFormProps) => {
  const initialValues:LoginFormFields = {
    email: '',
    password: '',
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

  const handleOnSubmit = (
    values: LoginFormFields,
    formikHelpers: FormikHelpers<LoginFormFields>,
  ): void => {
    const payload = {
      email: values.email ?? '',
      password: values.password ?? '',
    };
    handleLogin(payload);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={handleOnSubmit}
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
