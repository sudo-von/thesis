import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Formik, Field, FieldAttributes } from 'formik';
import { Input, Datepicker, Button } from 'src/components';
import { updateUserByID } from 'src/services/user.service';
import { useAuth } from 'src/contexts/auth.context';
import { TinyUser } from 'src/entities/user';
import { AuthActionKind } from 'src/reducers/auth.actions';
import updateAccountFormStyles from './UpdateAccountForm.styles';

type UpdateAccountFormFields = {
  name?: string,
  birth_date?: string,
  email?: string,
  registration_number?: string,
};

type UpdateAccountFormProps = {
  account?: TinyUser
};

const UpdateAccountForm = ({ account }:UpdateAccountFormProps):JSX.Element => {
  const { authDispatch } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues:UpdateAccountFormFields = {
    name: account?.name,
    birth_date: account?.birthDate,
    email: account?.email,
    registration_number: account?.registrationNumber,
  };

  const handleValidation = ({
    name, birth_date, email, registration_number,
  }:UpdateAccountFormFields) => {
    const errors:UpdateAccountFormFields = {};
    if (!name) {
      errors.name = 'Nombre requerido';
    }
    if (!birth_date) {
      errors.birth_date = 'Fecha de nacimiento requerida';
    }
    if (!email) {
      errors.email = 'Correo requerido';
    }
    if (!registration_number) {
      errors.registration_number = 'Matrícula requerida';
    }
    return errors;
  };

  const onHandleSubmit = async (data:UpdateAccountFormFields) => {
    try {
      setLoading(true);
      await updateUserByID(account.id, data);
      Alert.alert('¡Felicidades!', '¡Has actualizado tus datos con éxito!');
      authDispatch({ type: AuthActionKind.UPDATE, payload: { userName: data?.name } });
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={onHandleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }:FieldAttributes<any>) => (
        <View>
          <Input
            label="Ingresa tu nombre"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            error={errors.name}
          />
          <Field name="birth_date">
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
            onChangeText={handleChange('registration_number')}
            onBlur={handleBlur('registration_number')}
            value={values.registration_number}
            error={errors.registration_number}
            keyboardType="phone-pad"
          />
          <Button
            loading={loading}
            onPress={handleSubmit}
            loadingMessage="Actualizando cuenta..."
            style={updateAccountFormStyles.button}
          >
            Actualizar cuenta
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default UpdateAccountForm;
