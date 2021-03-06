import React from 'react';
import { View, Image } from 'react-native';
import {
  Container, Small, Bold,
} from 'src/components';
import useUser from 'src/hooks/useUser';
import { Title } from 'react-native-paper';
import Mood from 'src/pages/Home/Components/Mood/Mood';
import NavigationCard, { NavigationCardProps } from 'src/components/NavigationCard/NavigationCard';
import { ScrollView } from 'react-native-gesture-handler';
import { getFirstName, truncateName } from 'src/helpers/user-helper';
import homeStyles from './Home.styles';

const navigationCards: NavigationCardProps[] = [
  {
    icon: 'alert-circle-outline',
    color: '#ff5959',
    backgroundColor: '#f9e6e6',
    title: 'Botón de pánico',
    description: 'Solicita ayuda en caso de emergencia.',
    url: 'PanicButton',
  },
  {
    icon: 'book-open-variant',
    color: '#5978ff',
    backgroundColor: '#e8eaf9',
    title: 'Asesorías',
    description: 'Busca asesorías de cualquier materia.',
    url: 'Advices',
  },
  {
    icon: 'home-city-outline',
    color: '#59caff',
    backgroundColor: '#e5f6fa',
    title: 'Departamentos',
    description: 'Encuentra departamentos en renta.',
    url: 'Departments',
  },
  {
    icon: 'email-outline',
    color: '#ffda59',
    backgroundColor: '#f9f9e6',
    title: 'Sugerencias',
    description: 'Envíanos una sugerencia.',
    url: 'CreateSuggestion',
  },
];

const welcomeImage = require('assets/figma/welcome.png');

const Home = () => {
  const { user } = useUser();
  const { userName, userId } = user;
  const firstName = truncateName(getFirstName(userName));
  return (
    <Container>
      <Mood
        initialMoodValue={7.5}
        minimumValue={0}
        maximumValue={10}
        minimumText="Triste"
        maximumText="Feliz"
        userId={userId}
      />
      <View style={homeStyles.view}>
        <Image
          source={welcomeImage}
          style={homeStyles.image}
        />
        <View style={homeStyles.textView}>
          <Title style={homeStyles.title}>
            <Bold>¡Hola {firstName}!</Bold>
          </Title>
          <Small>Estamos muy emocionados{'\n'}de tenerte por aquí!</Small>
        </View>
      </View>
      <ScrollView contentContainerStyle={homeStyles.scrollView}>
        {navigationCards.map((navigationCard) => (
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
    </Container>
  );
};

export default Home;
