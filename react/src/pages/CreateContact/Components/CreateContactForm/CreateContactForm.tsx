import React from 'react';
import { View } from 'react-native';
import { FieldAttributes, Formik } from 'formik';
import { Input, Button } from 'src/components';
import { ContactPayload } from 'src/entities/contact';
import { useNavigation } from '@react-navigation/native';
import creacteContactFormStyles from './CreateContactForm.styles';

export type CreateContactFormFields = {
  contact_name?: string,
  contact_number?: string,
  message?: string,
};

type CreateContactFormProps = {
  userId: string,
  loading: boolean,
  initialValues: CreateContactFormFields,
  handleValidation: (payload: CreateContactFormFields) => CreateContactFormFields,
  handleCreate: (userId: string, payload: ContactPayload) => Promise<void>
};

const CreateContactForm = ({
  userId,
  loading,
  initialValues,
  handleValidation,
  handleCreate,
}: CreateContactFormProps) => {
  const navigation = useNavigation();
  const handleOnSubmit = async (
    values: CreateContactFormFields,
  ): Promise<void> => {
    const payload:ContactPayload = {
      contactName: values.contact_name ?? '',
      contactNumber: values.contact_number ?? '',
      message: values.message ?? '',
    };
    try {
      await handleCreate(userId, payload);
      navigation.navigate('Home');
    } catch (error) {
      navigation.navigate('Configuration');
    }
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
            loadingMessage="Guardando contacto..."
            style={creacteContactFormStyles.button}
          >
            Crear contacto
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default CreateContactForm;
