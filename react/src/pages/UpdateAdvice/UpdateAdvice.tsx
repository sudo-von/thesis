import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Bold, Small, Container, Loader } from 'src/components';
import { Title } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { getAdviceByID } from 'src/services/advice.service';
import { Advice } from 'src/entities/advice';
import updateAdviceStyles from './UpdateAdvice.styles';
import UpdateAdviceForm from './Components/UpdateAdviceForm/UpdateAdviceForm';

const UpdateAdvice = (): JSX.Element => {
  const { params } = useRoute();
  const [advice, setAdvice] = useState<Advice>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchAdviceByID = async () => {
      try {
        const response:Advice = await getAdviceByID(params.id);
        setAdvice(response);
      } catch (e) {
        Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    searchAdviceByID();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container style={updateAdviceStyles.container}>
          <View style={updateAdviceStyles.view}>
            <Title><Bold>Actualiza tu asesoría{'\n'}en cualquier momento!</Bold></Title>
            <Small>
              Manten la información de tu asesoría actualizada
              para que todos puedan acudir a ella.
            </Small>
          </View>
          { loading
            ? <Loader size={80} loadingMessage="Cargando asesoría" />
            : <UpdateAdviceForm advice={advice} /> }
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateAdvice;
