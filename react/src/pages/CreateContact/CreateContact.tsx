import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Container, Small, Bold } from 'src/components';
import { Title } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import creacteContactStyles from './CreateContact.styles';
import CreateContactForm from './Components/CreateContactForm/CreateContactForm';

const CreateContact = () => {
  const { user } = useUser();
  const { userId } = user;
  return (
    <SafeAreaView>
      <ScrollView>
        <Container style={creacteContactStyles.container}>
          <View style={creacteContactStyles.view}>
            <Title><Bold>¡Es importante mantener informados a tus seres queridos!</Bold></Title>
            <Small>
              Agrega un contacto para alertar a tus seres queridos en cualquier momento.
            </Small>
          </View>
          <CreateContactForm userID={userId} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateContact;
