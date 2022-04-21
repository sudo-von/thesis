import React, { createRef } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import {
  Container, Bold, Small, Error,
} from 'src/components';
import suggestionStyles from 'src/pages/Suggestion/Suggestion.styles';
import useSuggestion from 'src/hooks/useSuggestion';
import { useFocusEffect } from '@react-navigation/native';
import { FormikProps } from 'formik';
import CreateSuggestionForm, { CreateSuggestionFormFields } from './Components/CreateSuggestionForm/CreateSuggestionForm';

const Suggestion = ():JSX.Element => {
  const { loading, error, handleSuggestion } = useSuggestion();
  const formikRef = createRef<FormikProps<CreateSuggestionFormFields> | null>();

  const initialValues:CreateSuggestionFormFields = {
    suggestion: '',
  };

  const handleValidation = (
    { suggestion }:CreateSuggestionFormFields,
  ): CreateSuggestionFormFields => {
    const errors:CreateSuggestionFormFields = {};
    if (!suggestion) {
      errors.suggestion = 'Sugerencia requerida';
    }
    return errors;
  };

  useFocusEffect(
    React.useCallback(() => () => {
      formikRef.current?.resetForm();
    }, []),
  );

  return (
    <Container style={{ justifyContent: 'flex-start' }}>
      <View style={suggestionStyles.view}>
        <Title><Bold>Tu opinión es muy{'\n'}importante para nosotros!</Bold></Title>
        <Small>¡Realiza una sugerencia para mejorar la aplicación! </Small>
      </View>
      <CreateSuggestionForm
        loading={loading}
        initialValues={initialValues}
        handleSuggestion={handleSuggestion}
        handleValidation={handleValidation}
        formikRef={formikRef}
      />
      { error
        && <Error message={error} />}
    </Container>
  );
};

export default Suggestion;
