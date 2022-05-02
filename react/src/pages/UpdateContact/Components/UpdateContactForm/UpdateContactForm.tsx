import React from 'react';
import { View } from 'react-native';
import { FieldAttributes, Formik } from 'formik';
import { Input, Button } from 'src/components';
import { Contact, UpdateContactPayload } from 'src/entities/contact';
import updateContactFormStyles from './UpdateContactForm.styles';

export type UpdateContactFormFields = {
  contact_name?: string,
  contact_number?: string,
  message?: string,
};

type UpdateContactFormProps = {
  contact: Contact,
  loading: boolean,
  initialValues:UpdateContactFormFields,
  handleUpdate: (payload: UpdateContactPayload) => Promise<void>,
  handleValidation: (contact: UpdateContactFormFields) => UpdateContactFormFields,
};

const UpdateContactForm = ({
  contact,
  loading,
  initialValues,
  handleUpdate,
  handleValidation,
}:UpdateContactFormProps) => {
  const handleOnSubmit = async (
    values: UpdateContactFormFields,
  ): Promise<void> => {
    const payload:UpdateContactPayload = {
      id: contact.id,
      contactName: values.contact_name ?? '',
      contactNumber: values.contact_number ?? '',
      message: values.message ?? '',
    };
    await handleUpdate(payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validate={handleValidation}
      onSubmit={handleOnSubmit}
      enableReinitialize
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }:FieldAttributes<any>) => (
        <View>
          <Input
            label="Ingresa el nombre de tu contacto"
            onChangeText={handleChange('contact_name')}
            onBlur={handleBlur('contact_name')}
            value={values.contact_name}
            error={errors.contact_name}
          />
          <Input
            label="Ingresa el teléfono de tu contacto"
            onChangeText={handleChange('contact_number')}
            onBlur={handleBlur('contact_number')}
            value={values.contact_number}
            error={errors.contact_number}
            keyboardType="phone-pad"
          />
          <Input
            label="Ingresa tu mensaje de auxilio"
            onChangeText={handleChange('message')}
            onBlur={handleBlur('message')}
            value={values.message}
            error={errors.message}
          />
          <Button
            loading={loading}
            onPress={handleSubmit}
            loadingMessage="Actualizando el contacto..."
            style={updateContactFormStyles.button}
          >
            Actualizar contacto
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default UpdateContactForm;
