import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Container, Small, Bold, Loader, Success, Error,
} from 'src/components';
import { Title } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useSingleContact from 'src/hooks/useSingleContact';
import useContact from 'src/hooks/useContact';
import { Error as ErrorEntity } from 'src/entities/error';
import updateContactStyles from './UpdateContact.styles';
import UpdateContactForm, { UpdateContactFormFields } from './Components/UpdateContactForm/UpdateContactForm';

const UpdateContact = () => {
  const { user } = useUser();
  const { userId } = user;

  const {
    contact,
    loading: contactLoading,
    error: contactError,
  } = useSingleContact(userId);

  const {
    success,
    handleUpdate,
    loading: updateLoading,
    error: errorLoading,
  } = useContact();

  let error:ErrorEntity = null;
  if (contactError) {
    error = contactError;
  } else if (errorLoading) {
    error = errorLoading;
  }

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
    } else if (contact_number?.length !== 12) {
      errors.contact_number = 'Ingresa un número de teléfono válido';
    }
    if (!message) {
      errors.message = 'Mensaje de auxilio requerido';
    }
    return errors;
  };

  return (
    <Container style={updateContactStyles.container}>
      <View style={updateContactStyles.view}>
        <Title><Bold>¡Tu contacto de emergencia puede ser de ayuda!</Bold></Title>
        <Small>
          Modifica tu información de contacto
          para mantener informados a tus seres queridos.
        </Small>
      </View>
      { contactLoading
        ? (
          <View style={updateContactStyles.loader}>
            <Loader loadingMessage="Cargando contacto..." size={85} />
          </View>
        )
        : contact && (
          <ScrollView>
            <UpdateContactForm
              contact={contact}
              loading={updateLoading}
              handleUpdate={handleUpdate}
              initialValues={initialValues}
              handleValidation={handleValidation}
            />
          </ScrollView>
        )}
      {error
        && <Error message={error} /> }
      {success
        && <Success message={success} /> }
    </Container>
  );
};

export default UpdateContact;
