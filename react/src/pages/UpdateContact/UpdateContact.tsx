import React, { useState, useEffect } from 'react';
import {
  Alert, View, SafeAreaView, ScrollView,
} from 'react-native';
import {
  Container, Small, Bold, Loader,
} from 'src/components';
import { Title } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import { getContactByUserID } from 'src/services/contact.service';
import { Contact } from 'src/entities/contact';
import creacteContactStyles from './UpdateContact.styles';
import UpdateContactForm from './Components/UpdateContactForm/UpdateContactForm';

const ContactConfiguration = () => {
  const { user } = useUser();
  const { userId } = user;

  const [contact, setContact] = useState<Contact>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchContact = async () => {
      try {
        const response:Contact = await getContactByUserID(userId);
        setContact(response);
      } catch (e) {
        Alert.alert('¡No ha sido posible cargar la información de tu contacto!', (e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    searchContact();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container style={creacteContactStyles.container}>
          <View style={creacteContactStyles.view}>
            <Title><Bold>¡Es importante mantener informados a tus seres queridos!</Bold></Title>
            <Small>
              Modifica tu información de contacto
              para alertar a tus seres queridos en cualquier momento.
            </Small>
          </View>
          { loading
            ? <Loader size={80} loadingMessage="Cargando contacto" />
            : <UpdateContactForm contact={contact} />}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactConfiguration;
