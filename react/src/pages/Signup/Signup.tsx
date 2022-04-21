import React from 'react';
import SignupForm from 'src/pages/Signup/Components/SignupForm/SignupForm';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {
  Container, Small, Center, Bold, Link,
} from 'src/components';
import { Title } from 'react-native-paper';
import useUniversities from 'src/hooks/useUniversities';
import signupStyles from './Signup.styles';

const Signup = () => {
  const { loading, error, universities } = useUniversities();
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <View style={signupStyles.view}>
            <Title style={signupStyles.title}><Bold>¡Bienvenido!</Bold></Title>
            <Small>Crea tu cuenta completando el formulario.</Small>
          </View>
          <SignupForm universities={universities} loading={loading} error={error} />
          <Center>
            <Small>¿Ya tienes una cuenta?</Small>
            <Link url="Login">¡Inicia sesión aquí!</Link>
          </Center>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
