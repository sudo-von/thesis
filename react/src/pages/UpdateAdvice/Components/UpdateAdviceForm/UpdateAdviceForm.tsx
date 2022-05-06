import React from 'react';
import { View } from 'react-native';
import { Formik, Field, FieldAttributes } from 'formik';
import {
  Input,
  SelectInput,
  Datepicker,
  Timepicker,
  Button,
} from 'src/components';
import { Advice, UpdateAdvicePayload } from 'src/entities/advice';
import { Option } from 'src/components/SelectInput/SelectInput';
import { University } from 'src/entities/university';
import updateAdviceFormStyles from './UpdateAdviceForm.styles';

export type UpdateAdviceFormFields = {
  subject?: string,
  advice_date?: string,
  advice_time?: string,
  classroom_id?: string,
};

type UpdateAdviceFormProps = {
  advice: Advice,
  loading: boolean,
  university: University,
  initialValues: UpdateAdviceFormFields,
  handleValidation: ({
    subject,
    advice_date,
    advice_time,
    classroom_id,
  }:UpdateAdviceFormFields) => UpdateAdviceFormFields,
  handleUpdateAdvice: (updateAdvicePayload: UpdateAdvicePayload) => Promise<void>
};

const UpdateAdviceForm = ({
  advice,
  loading,
  university,
  initialValues,
  handleValidation,
  handleUpdateAdvice,
}:UpdateAdviceFormProps): JSX.Element => {
  const onHandleSubmit = async (values:UpdateAdviceFormFields) => {
    const payload:UpdateAdvicePayload = {
      id: advice.id ?? '',
      subject: values.subject ?? '',
      adviceDate: `${values.advice_date} ${values.advice_time}` ?? '',
      classroomId: values.classroom_id ?? '',
    };
    await handleUpdateAdvice(payload);
  };

  const options:Option[] = university.classrooms.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={onHandleSubmit}
      validateOnChange
      validateOnBlur
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }:FieldAttributes<any>) => (
        <View>
          <Input
            label="Ingresa la materia"
            onChangeText={handleChange('subject')}
            onBlur={handleBlur('subject')}
            value={values.subject}
            error={errors.subject}
          />
          <Field name="advice_date">
            {({ field, form, meta }:FieldAttributes<any>) => (
              <Datepicker
                label="Selecciona la fecha de la asesoría"
                field={field}
                form={form}
                meta={meta}
              />
            )}
          </Field>
          <Field name="advice_time">
            {({ field, form, meta }:FieldAttributes<any>) => (
              <Timepicker
                label="Selecciona la hora de la asesoría"
                field={field}
                form={form}
                meta={meta}
              />
            )}
          </Field>
          <Field name="classroom_id">
            {({ field, form }:FieldAttributes<any>) => (
              <SelectInput
                label="Selecciona el salón"
                data={options}
                field={field}
                form={form}
                error={errors.classroom_id}
              />
            )}
          </Field>
          <Button
            loading={loading}
            loadingMessage="Actualizando asesoría..."
            onPress={handleSubmit}
            style={updateAdviceFormStyles.button}
          >
            Actualizar asesoría
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default UpdateAdviceForm;
