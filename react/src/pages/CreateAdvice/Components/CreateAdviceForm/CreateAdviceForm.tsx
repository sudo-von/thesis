import React from 'react';
import { View } from 'react-native';
import {
  Formik, Field, FormikHelpers, FieldAttributes,
} from 'formik';
import {
  Input,
  SelectInput,
  Datepicker,
  Timepicker,
  Button,
} from 'src/components';
import { AdvicePayload } from 'src/entities/advice';
import { University } from 'src/entities/university';
import createAdviceFormStyles from './CreateAdviceForm.styles';

export type CreateAdviceFormFields = {
  subject?: string,
  advice_date?: string,
  advice_time?: string,
  classroom_id?: string,
};

export type ClassroomOption = {
  label: string,
  value: string,
};

export type CreateAdviceFormProps = {
  university: University,
  error: string | null,
  loading: boolean,
  initialValues: CreateAdviceFormFields
  handleValidation: ({
    subject,
    advice_date,
    advice_time,
    classroom_id,
  }:CreateAdviceFormFields) => CreateAdviceFormFields,
  handleCreateAdvice: (
    advicePayload:AdvicePayload,
  ) => Promise<void>,
};

const CreateAdviceForm = ({
  error,
  loading,
  university,
  initialValues,
  handleValidation,
  handleCreateAdvice,
}: CreateAdviceFormProps):JSX.Element => {
  const onHandleSubmit = async (
    values: CreateAdviceFormFields,
    formik: FormikHelpers<CreateAdviceFormFields>,
  ): Promise<void> => {
    const payload:AdvicePayload = {
      subject: values.subject ?? '',
      adviceDate: `${values.advice_date} ${values.advice_time}` ?? '',
      classroomId: values.classroom_id ?? '',
    };
    await handleCreateAdvice(payload);
    if (!error) {
      formik.resetForm();
    }
  };

  const classrooms: ClassroomOption[] = university.classrooms.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={onHandleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
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
                data={classrooms}
                field={field}
                form={form}
                error={errors.classroom_id}
              />
            )}
          </Field>
          <Button
            loading={loading}
            loadingMessage="Registrando asesoría..."
            onPress={handleSubmit}
            style={createAdviceFormStyles.button}
          >
            Registrar asesoría
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default CreateAdviceForm;
