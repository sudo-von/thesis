import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import {
  Bold,
  Small,
  Container,
  Error,
  Loader,
  Success,
} from 'src/components';
import { Title } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useSingleUniversity from 'src/hooks/useSingleUniversity';
import useAdvice from 'src/hooks/useAdvice';
import createAdviceStyles from './CreateAdvice.styles';
import CreateAdviceForm, { CreateAdviceFormFields } from './Components/CreateAdviceForm/CreateAdviceForm';

const CreateAdvice = () => {
  const { user } = useUser();
  const { universityId } = user;
  const { university, error, loading } = useSingleUniversity(universityId);
  const {
    success,
    error: createError,
    loading: createLoading,
    handleCreateAdvice,
  } = useAdvice();

  const initialValues:CreateAdviceFormFields = {
    subject: '',
    advice_date: '',
    advice_time: '',
    classroom_id: '',
  };

  const handleValidation = ({
    subject, advice_date, advice_time, classroom_id,
  }:CreateAdviceFormFields) => {
    const errors:CreateAdviceFormFields = {};
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
    <Container style={createAdviceStyles.container}>
      <View style={createAdviceStyles.view}>
        <Title><Bold>Apreciamos que quieras ayudar a tus compañeros!</Bold></Title>
        <Small>
          Al brindar una asesoría podrás apoyar a tus compañeros
          logrando que todos crezcan juntos como profesionistas.
        </Small>
      </View>
      { loading
        ? <View style={createAdviceStyles.loader}><Loader loadingMessage="Cargando..." /></View>
        : university && (
          <SafeAreaView>
            <ScrollView>
              <CreateAdviceForm
                university={university}
                handleCreateAdvice={handleCreateAdvice}
                initialValues={initialValues}
                handleValidation={handleValidation}
                error={createError}
                loading={createLoading}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      {error
      && <Error message={error} />}
      {createError
      && <Error message={createError} />}
      {success
      && <Success message={success} />}
    </Container>
  );
};

export default CreateAdvice;
