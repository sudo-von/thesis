/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Button, Input } from 'src/components';
import createSuggestionFormStyles from './CreateSuggestionForm.styles';

export type CreateSuggestionFormFields = {
  suggestion?: string,
};

type CreateSuggestionFormProps = {
  loading: boolean,
  initialValues: CreateSuggestionFormFields,
  handleValidation: ({ suggestion }:CreateSuggestionFormFields) => CreateSuggestionFormFields,
  handleSuggestion: (
    values: CreateSuggestionFormFields,
    formikHelpers: FormikHelpers<CreateSuggestionFormFields>
  ) => void,
  formikRef: React.MutableRefObject<FormikProps<CreateSuggestionFormFields> | null>,
};

const CreateSuggestionForm = ({
  loading, initialValues, handleSuggestion, handleValidation, formikRef,
}:CreateSuggestionFormProps):JSX.Element => (
  <Formik
    initialValues={initialValues}
    validate={handleValidation}
    onSubmit={handleSuggestion}
    innerRef={(p) => {
      // eslint-disable-next-line no-param-reassign
      formikRef.current = p;
    }}
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

export default CreateSuggestionForm;
