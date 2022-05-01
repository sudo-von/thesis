import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  Container, Small, Bold, Error, Loader,
} from 'src/components';
import { Title } from 'react-native-paper';
import { Contact } from 'src/entities/contact';
import useUser from 'src/hooks/useUser';
import NavigationCard, { NavigationCardProps } from 'src/components/NavigationCard/NavigationCard';
import useContactByUserId from 'src/hooks/useContactByUserId';
import configurationStyles from './Configuration.styles';

const navigationCards = (contact:Contact | null | undefined): NavigationCardProps[] => ([
  {
    icon: 'account-cog-outline',
    color: '#498FE2',
    backgroundColor: '#e6F3FF',
    title: 'Configuración de la cuenta',
    description: 'Configura tus datos personales en cualquier momento.',
    url: 'UpdateAccount',
  },
  {
    icon: 'whatsapp',
    color: '#49E286',
    backgroundColor: '#e6ffe8',
    title: 'Configuración de contacto',
    description: contact ? 'Actualiza la información de tu contacto de confianza.' : 'Registra un contacto de confianza.',
    url: contact ? 'UpdateContact' : 'CreateContact',
  },
]);

const welcomeImage = require('assets/figma/configuration.png');

const Configuration = () => {
  const { user } = useUser();
  const { userId } = user;
  const { contact, loading, error } = useContactByUserId(userId);
  const cards = navigationCards(contact);
  return (
    <Container>
      <View style={configurationStyles.view}>
        <Image
          source={welcomeImage}
          style={configurationStyles.image}
        />
        <View style={configurationStyles.textView}>
          <Title style={configurationStyles.text}>
            <Bold>¿Deseas actualizar tu información?</Bold>
          </Title>
          <Small style={configurationStyles.text}>¡Este es el lugar adecuado!</Small>
        </View>
      </View>
      { loading
        ? (
          <View style={configurationStyles.loader}>
            <Loader loadingMessage="Cargando configuración..." size={85} />
          </View>
        )
        : (
          <ScrollView contentContainerStyle={configurationStyles.scrollView}>
            {cards.map((navigationCard) => (
              <NavigationCard
                key={`${navigationCard.title}`}
                icon={navigationCard.icon}
                color={navigationCard.color}
                backgroundColor={navigationCard.backgroundColor}
                title={navigationCard.title}
                description={navigationCard.description}
                url={navigationCard.url}
              />
            ))}
          </ScrollView>
        )}
      {error
      && <Error message={error} /> }
    </Container>
  );
};

export default Configuration;
