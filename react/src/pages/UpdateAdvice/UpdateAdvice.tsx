import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Bold,
  Small,
  Container,
  Loader,
  Success,
  Error,
} from 'src/components';
import { Title } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DrawerParamList } from 'src/router/Router';
import useSingleAdvice from 'src/hooks/useSingleAdvice';
import moment from 'moment';
import useUser from 'src/hooks/useUser';
import useSingleUniversity from 'src/hooks/useSingleUniversity';
import updateAdviceStyles from './UpdateAdvice.styles';
import UpdateAdviceForm, { UpdateAdviceFormFields } from './Components/UpdateAdviceForm/UpdateAdviceForm';

const UpdateAdvice = (): JSX.Element => {
  const { params } = useRoute<RouteProp<DrawerParamList, 'UpdateAdvice'>>();
  const { user } = useUser();
  const { id } = params;

  const {
    loading,
    error,
    success,
    advice,
    handleUpdateAdvice,
  } = useSingleAdvice(id);

  const {
    university,
    loading: loadingError,
    error: universityError,
  } = useSingleUniversity(user.universityId);

  const initialValues:UpdateAdviceFormFields = {
    subject: advice?.subject,
    advice_date: moment(advice?.adviceDate).format('YYYY-MM-DD'),
    advice_time: moment(advice?.adviceDate).format('HH:mm'),
    classroom_id: advice?.classroom.id,
  };

  const handleValidation = ({
    subject, advice_date, advice_time, classroom_id,
  }:UpdateAdviceFormFields) => {
    const errors:UpdateAdviceFormFields = {};
    if (!subject) {
      errors.subject = 'Materia requerida';
    }
    if (!advice_date) {
      errors.advice_date = 'Fecha de la asesoría requerida';
    }
    if (!advice_time) {
      errors.advice_time = 'Hora de la asesoría requerida';
    }
    if (!classroom_id) {
      errors.classroom_id = 'Salón requerido';
    }
    return errors;
  };

  return (
    <Container style={updateAdviceStyles.container}>
      <View style={updateAdviceStyles.view}>
        <Title><Bold>Actualiza tu asesoría{'\n'}en cualquier momento!</Bold></Title>
        <Small>
          Manten la información de tu asesoría actualizada
          para que todos puedan acudir a ella.
        </Small>
      </View>
      { (loading || loadingError)
        ? <View style={updateAdviceStyles.loader}><Loader loadingMessage="Cargando asesoría..." /></View>
        : (advice && university) && (
          <SafeAreaView>
            <ScrollView>
              <UpdateAdviceForm
                advice={advice}
                university={university}
                loading={loading}
                initialValues={initialValues}
                handleValidation={handleValidation}
                handleUpdateAdvice={handleUpdateAdvice}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      { (error)
        && <Error message={error} /> }
      { (universityError)
        && <Error message={universityError} /> }
      { success
        && <Success message={success} /> }
    </Container>
  );
};

export default UpdateAdvice;
