import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import {
  Container, Bold, Small, Error, Success,
} from 'src/components';
import suggestionStyles from 'src/pages/Suggestion/Suggestion.styles';
import useSuggestion from 'src/hooks/useSuggestion';
import CreateSuggestionForm, { CreateSuggestionFormFields } from './Components/CreateSuggestionForm/CreateSuggestionForm';

const Suggestion = ():JSX.Element => {
  const {
    loading,
    error,
    success,
    handleSuggestion,
  } = useSuggestion();

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
      />
      { error
        && <Error message={error} />}
      { success
        && <Success message={success} />}
    </Container>
  );
};

export default Suggestion;
