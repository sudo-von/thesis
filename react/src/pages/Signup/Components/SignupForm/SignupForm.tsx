import React from 'react';
import { View } from 'react-native';
import {
  Formik,
  Field,
  FormikHelpers,
  FieldAttributes,
} from 'formik';
import {
  Input,
  PasswordInput,
  SelectInput,
  Datepicker,
  Option,
  Button,
  Error,
} from 'src/components';
import { useNavigation } from '@react-navigation/native';
import useUser from 'src/hooks/useUser';
import { University } from 'src/entities/university';
import signupFormStyles from './SignupForm.styles';

type SignupFormProps = {
  universities: University[],
  loading: boolean,
  error: string | null,
};

type SignupFormFields = {
  name?: string,
  birthDate?: string,
  email?: string,
  registrationNumber?: string,
  universityId?: string,
  password?: string,
};

const SignupForm = ({ universities, loading, error }: SignupFormProps) => {
  /* TODO: Handle nagivation type. */
  const navigation = useNavigation();
  /* TODO: Handle these hooks in a better way. */
  const { loading: loadingSignup, error: errorSignup, handleSignup } = useUser();

  const initialValues:SignupFormFields = {
    name: 'VoN',
    birthDate: '1997-04-17',
    email: 'martinez-angel@uadec.edu.mx',
    registrationNumber: '16190775',
    universityId: '',
    password: 'college-app',
  };

  const handleValidation = (
    {
      name, birthDate, email, registrationNumber, universityId, password,
    }: SignupFormFields,
  ) => {
    const errors:SignupFormFields = {};
    if (!name) {
      errors.name = 'Nombre requerido';
    }
    if (!birthDate) {
      errors.birthDate = 'Fecha de nacimiento requerida';
    }
    if (!email) {
      errors.email = 'Correo requerido';
    }
    if (!registrationNumber) {
      errors.registrationNumber = 'Matrícula requerida';
    }
    if (!universityId) {
      errors.universityId = 'Universidad requerida';
    }
    if (!password) {
      errors.password = 'Contraseña requerida';
    }
    return errors;
  };

  /* TODO: Handle this in a better way. */
  const onSubmit = async (values: SignupFormFields, formik: FormikHelpers<SignupFormFields>) => {
    await handleSignup(values, { resetForm: formik.resetForm }, navigation);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={onSubmit}
      validateOnChange
      validateOnBlur
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }) => (
        <View>
          <Input
            label="Ingresa tu nombre"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            error={errors.name}
          />
          <Field name="birthDate">
            {({ field, form, meta }:FieldAttributes<any>) => (
              <Datepicker
                label="Selecciona tu fecha de nacimiento"
                field={field}
                form={form}
                meta={meta}
              />
            )}
          </Field>
          <Input
            label="Ingresa tu correo institucional"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={errors.email}
          />
          <Input
            label="Ingresa tu matrícula"
            onChangeText={handleChange('registrationNumber')}
            onBlur={handleBlur('registrationNumber')}
            value={values.registrationNumber}
            error={errors.registrationNumber}
            keyboardType="phone-pad"
          />
          <Field name="universityId">
            {({ field, form }:FieldAttributes<any>) => (
              <SelectInput
                label={loading ? 'Cargando universidades...' : 'Selecciona tu universidad'}
                data={universities.map(({ id, name, profilePicture }) => ({
                  label: name,
                  value: id,
                  custom: <Option source={profilePicture} label={name} />,
                }))}
                field={field}
                form={form}
                error={errors.universityId}
              />
            )}
          </Field>
          { error
            && <Error message={error} />}
          <PasswordInput
            label="Ingresa tu contraseña"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={errors.password}
          />
          { errorSignup
            && <Error message={errorSignup} />}
          <Button
            loading={loadingSignup}
            loadingMessage="Registrando usuario..."
            onPress={handleSubmit}
            style={signupFormStyles.button}
          >
            Registrarse
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default SignupForm;
