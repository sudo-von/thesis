import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Bold, Small, Container } from 'src/components';
import { Title } from 'react-native-paper';
import createDepartmentStyles from './CreateDepartment.styles';
import CreateDepartmentForm from './Components/CreateDepartmentForm/CreateDepartmentForm';

const CreateDepartmentPage = () => (
  <SafeAreaView>
    <ScrollView>
      <Container style={createDepartmentStyles.container}>
        <View style={createDepartmentStyles.view}>
          <Title><Bold>Anuncia un departamento!</Bold></Title>
          <Small>
            Podrás brindarle una oportunidad a tus compañeros para
            encontrar un lugar que les permita continuar con sus estudios.
          </Small>
        </View>
        <CreateDepartmentForm />
      </Container>
    </ScrollView>
  </SafeAreaView>
);

export default CreateDepartmentPage;
