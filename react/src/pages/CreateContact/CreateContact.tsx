import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Container,
  Small,
  Bold,
  Error,
  Success,
} from 'src/components';
import { Title } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useContact from 'src/hooks/useContact';
import creacteContactStyles from './CreateContact.styles';
import CreateContactForm, { CreateContactFormFields } from './Components/CreateContactForm/CreateContactForm';

const CreateContact = () => {
  const { user } = useUser();
  const { userId } = user;

  const {
    success,
    handleCreate,
    loading,
    error,
  } = useContact();

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
    } else if (contact_number?.length !== 12) {
      errors.contact_number = 'Ingresa un número de teléfono válido';
    }
    if (!message) {
      errors.message = 'Mensaje de auxilio requerido';
    }
    return errors;
  };

  return (
    <Container style={creacteContactStyles.container}>
      <View style={creacteContactStyles.view}>
        <Title><Bold>¡Es importante mantener informados a tus seres queridos!</Bold></Title>
        <Small>
          Agrega un contacto para alertar a tus seres queridos en cualquier momento.
        </Small>
      </View>
      <ScrollView>
        <CreateContactForm
          userId={userId}
          initialValues={initialValues}
          loading={loading}
          handleValidation={handleValidation}
          handleCreate={handleCreate}
        />
      </ScrollView>
      {error
        && <Error message={error} /> }
      {success
        && <Success message={success} /> }
    </Container>
  );
};

export default CreateContact;
