import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { FieldAttributes, Formik } from 'formik';
import { Input, Button } from 'src/components';
import { updateContactByID } from 'src/services/contact.service';
import { Contact } from 'src/entities/contact';
import updateContactFormStyles from './UpdateContactForm.styles';

type UpdateContactFormFields = {
  contact_name?: string,
  contact_number?: string,
  message?: string,
};

type UpdateContactFormProps = {
  contact?: Contact,
};

const UpdateContactForm = ({ contact }:UpdateContactFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues:UpdateContactFormFields = {
    contact_name: contact?.contactName,
    contact_number: contact?.contactNumber,
    message: contact?.message,
  };

  const handleValidation = ({ contact_name, contact_number, message }:UpdateContactFormFields) => {
    const errors:UpdateContactFormFields = {};
    if (!contact_name) {
      errors.contact_name = 'Nombre del contacto requerido';
    }
    if (!contact_number) {
      errors.contact_number = 'Número de contacto requerido';
    }
    if (!message) {
      errors.message = 'Mensaje de auxilio requerido';
    }
    return errors;
  };

  const onSubmit = async (form:UpdateContactFormFields) => {
    try {
      setLoading(true);
      const response = await updateContactByID(contact.id, form);
      Alert.alert('¡Felicidades!', response);
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error al actualizar tu contacto!', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validate={handleValidation}
      onSubmit={onSubmit}
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
