import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Bold, Small, Container } from 'src/components';
import { Title } from 'react-native-paper';
import createAdviceStyles from './CreateAdvice.styles';
import CreateAdviceForm from './Components/CreateAdviceForm/CreateAdviceForm';

const CreateAdvice = () => (
  <SafeAreaView>
    <ScrollView>
      <Container style={createAdviceStyles.container}>
        <View style={createAdviceStyles.view}>
          <Title><Bold>Apreciamos que quieras ayudar a tus compañeros!</Bold></Title>
          <Small>
            Al brindar una asesoría podrás apoyar a tus compañeros
            logrando que todos crezcan juntos como profesionistas.
          </Small>
        </View>
        <CreateAdviceForm />
      </Container>
    </ScrollView>
  </SafeAreaView>
);

export default CreateAdvice;
