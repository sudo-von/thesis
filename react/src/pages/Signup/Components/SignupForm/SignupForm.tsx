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
} from 'src/components';
import { University } from 'src/entities/university';
import { UserPayload } from 'src/entities/user';
import signupFormStyles from './SignupForm.styles';

type SignupFormProps = {
  universities: University[],
  loadingUniversities: boolean,
  loadingSignup: boolean,
  handleSignup: (payload:UserPayload) => Promise<void>,
};

type SignupFormFields = {
  name?: string,
  birthDate?: string,
  email?: string,
  registrationNumber?: string,
  universityId?: string,
  password?: string,
};

const SignupForm = ({
  universities,
  loadingUniversities,
  loadingSignup,
  handleSignup,
}: SignupFormProps) => {
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

  const handleOnSubmit = async (
    values: SignupFormFields,
    formik: FormikHelpers<SignupFormFields>,
  ) => {
    const payload = {
      name: values.name ?? '',
      birthDate: values.birthDate ?? '',
      email: values.email ?? '',
      registrationNumber: values.registrationNumber ?? '',
      universityId: values.universityId ?? '',
      password: values.password ?? '',
    };
    await handleSignup(payload);
    formik.resetForm();
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
                label={loadingUniversities ? 'Cargando universidades...' : 'Selecciona tu universidad'}
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
          <PasswordInput
            label="Ingresa tu contraseña"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={errors.password}
          />
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
