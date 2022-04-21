import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Container, Small, Bold, NavigationBadge, Loader,
} from 'src/components';
import { Title } from 'react-native-paper';
import { Contact } from 'src/entities/contact';
import { getContactByUserID } from 'src/services/contact.service';
import useUser from 'src/hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import configurationStyles from './Configuration.styles';

const Configuration = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { userId } = user;
  const [contact, setContact] = useState<Contact>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const searchContact = async () => {
      try {
        const response:Contact = await getContactByUserID(userId);
        setContact(response);
      } catch (e) {
        setContact(undefined);
      } finally {
        setLoading(false);
      }
    };
    const willFocusSubscription = navigation.addListener('focus', () => {
      searchContact();
    });
    return willFocusSubscription;
  }, []);

  return (
    <Container style={configurationStyles.container}>
      <View style={configurationStyles.view}>
        <Title><Bold>¡Bienvenido al{'\n'}panel de configuración!</Bold></Title>
        <Small>Modifica tu información en cualquier momento.</Small>
      </View>
      { loading
        ? <Loader size={80} loadingMessage="Cargando configuraciones" />
        : (
          <View>
            <NavigationBadge
              url="/account-configuration"
              title="Configuración de la cuenta"
              icon="account-cog-outline"
              color="#498FE2"
              backgroundColor="#e6F3FF"
            />
            <NavigationBadge
              url={contact ? '/update-contact-configuration' : '/contact-configuration'}
              title={contact ? 'Actualizar contacto' : 'Agregar contacto'}
              icon="whatsapp"
              color="#49E286"
              backgroundColor="#e6ffe8"
            />
          </View>
        )}
    </Container>
  );
};

export default Configuration;
