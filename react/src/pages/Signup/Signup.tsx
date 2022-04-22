import React from 'react';
import SignupForm from 'src/pages/Signup/Components/SignupForm/SignupForm';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Container, Small, Center, Error,
} from 'src/components';
import useUniversities from 'src/hooks/useUniversities';
import useUser from 'src/hooks/useUser';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import signupStyles from './Signup.styles';

const Signup = () => {
  const {
    loading: loadingUniversities,
    error: errorUniversities,
    universities,
  } = useUniversities();

  const {
    loading: loadingSignup,
    error: errorSignup,
    handleSignup,
  } = useUser();

  const theme = useTheme();
  const navigation = useNavigation();
  const styles = signupStyles(theme.colors.primary);
  const handleNavigation = () => navigation.navigate('Login');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <SignupForm
          handleSignup={handleSignup}
          universities={universities}
          loadingSignup={loadingSignup}
          loadingUniversities={loadingUniversities}
        />
        { errorSignup && <Error message={errorSignup} />}
        { errorUniversities && <Error message={errorUniversities} />}
        <TouchableOpacity onPress={handleNavigation}>
          <Center>
            <Small>¿Ya tienes una cuenta?</Small>
            <Text style={styles.text}>¡Inicia sesión aquí!</Text>
          </Center>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  );
};

export default Signup;
