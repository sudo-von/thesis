import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { FieldAttributes, Formik } from 'formik';
import { Input, Button } from 'src/components';
import { createContactByUserID } from 'src/services/contact.service';
import { styles } from './CreateContactForm.styles';

type CreateContactFormFields = {
  contact_name?: string,
  contact_number?: string,
  message?: string,
};

type CreateContactFormProps = {
  userID: string,
};

const CreateContactForm = ({ userID }: CreateContactFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues:CreateContactFormFields = {
    contact_name: '',
    contact_number: '',
    message: '',
  };

  const handleValidation = ({ contact_name, contact_number, message }:CreateContactFormFields) => {
    const errors:CreateContactFormFields = {};
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

  const onSubmit = async (form:CreateContactFormFields) => {
    try {
      setLoading(true);
      const createResponse = await createContactByUserID(userID, form);
      setLoading(false);
      Alert.alert(createResponse, 'El contacto ha sido guardado con éxito.');
    } catch (e) {
      setLoading(false);
      Alert.alert('¡Ha ocurrido un error al registrar tu contacto!', (e as Error).message);
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
            loadingMessage="Guardando contacto..."
            style={styles.button}
          >
            Crear contacto
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default CreateContactForm;
