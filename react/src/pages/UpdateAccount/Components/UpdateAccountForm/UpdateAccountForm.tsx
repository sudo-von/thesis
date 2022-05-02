import React from 'react';
import { View } from 'react-native';
import {
  Formik,
  Field,
  FieldAttributes,
} from 'formik';
import { Input, Datepicker, Button } from 'src/components';
import { TinyUser, UpdateUserPayload } from 'src/entities/user';
import updateAccountFormStyles from './UpdateAccountForm.styles';

export type UpdateAccountFormFields = {
  name?: string,
  birth_date?: string,
  email?: string,
  registration_number?: string,
};

type UpdateAccountFormProps = {
  account: TinyUser
  loading: boolean,
  initialValues:UpdateAccountFormFields,
  handleUpdate: (payload: UpdateUserPayload) => Promise<void>,
  handleValidation: (account: UpdateAccountFormFields) => UpdateAccountFormFields,
};

const UpdateAccountForm = ({
  account, loading, initialValues, handleUpdate, handleValidation,
}:UpdateAccountFormProps):JSX.Element => {
  const handleOnSubmit = async (
    values: UpdateAccountFormFields,
  ): Promise<void> => {
    const payload:UpdateUserPayload = {
      id: account.id,
      name: values.name ?? '',
      birthDate: values.birth_date ?? '',
      email: values.email ?? '',
      registrationNumber: values.registration_number ?? '',
    };
    handleUpdate(payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={handleOnSubmit}
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
