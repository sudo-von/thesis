/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { Button, Input } from 'src/components';
import { SuggestionPayload } from 'src/entities/suggestion';
import createSuggestionFormStyles from './CreateSuggestionForm.styles';

export type CreateSuggestionFormFields = {
  suggestion?: string,
};

type CreateSuggestionFormProps = {
  loading: boolean,
  initialValues: CreateSuggestionFormFields,
  handleValidation: ({ suggestion }:CreateSuggestionFormFields) => CreateSuggestionFormFields,
  handleSuggestion: (
    values: SuggestionPayload,
  ) => Promise<void>,
};

const CreateSuggestionForm = ({
  loading, initialValues, handleSuggestion, handleValidation,
}:CreateSuggestionFormProps):JSX.Element => {
  const handleOnSubmit = async (
    values: CreateSuggestionFormFields,
    formikHelpers: FormikHelpers<CreateSuggestionFormFields>,
  ): Promise<void> => {
    const suggestion:SuggestionPayload = {
      suggestion: values.suggestion ?? '',
    };
    handleSuggestion(suggestion);
    formikHelpers.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={handleOnSubmit}
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }) => (
        <View>
          <Input
            label="Escribe tu sugerencia"
            onChangeText={handleChange('suggestion')}
            onBlur={handleBlur('suggestion')}
            value={values.suggestion}
            error={errors.suggestion}
            numberOfLines={5}
            multiline
          />
          <Button
            loading={loading}
            loadingMessage="Enviando sugerencia"
            style={createSuggestionFormStyles.button}
            onPress={handleSubmit}
          >
            Enviar sugerencia
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default CreateSuggestionForm;
