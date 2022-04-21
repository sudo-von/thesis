import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import {
  Formik, Field, FormikHelpers, FieldAttributes,
} from 'formik';
import { createAdvice } from 'src/services/advice.service';
import { getUniversityByID } from 'src/services/university.service';
import useUser from 'src/hooks/useUser';
import {
  Input,
  SelectInput,
  Datepicker,
  Timepicker,
  Button,
} from 'src/components';
import { Classroom } from 'src/entities/classroom';
import createAdviceFormStyles from './CreateAdviceForm.styles';

type CreateAdviceFormFields = {
  subject?: string,
  advice_date?: string,
  advice_time?: string,
  classroom_id?: string,
};

type ClassroomOption = {
  label: string,
  value: string,
};

const CreateAdviceForm = () => {
  const { user } = useUser();
  const { universityId } = user;

  const [loading, setLoading] = useState(false);
  const [classrooms, setClassrooms] = useState<ClassroomOption[]>([]);

  useEffect(() => {
    const searchUniversityByID = async () => {
      try {
        const university = await getUniversityByID(universityId);
        setClassrooms(university.classrooms.map(
          (classroom:Classroom) => ({ label: classroom.name, value: classroom.id }),
        ));
      } catch (e) {
        Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
      }
    };
    searchUniversityByID();
  }, []);

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

  const onHandleSubmit = async (
    values: CreateAdviceFormFields,
    formik: FormikHelpers<CreateAdviceFormFields>,
  ) => {
    try {
      setLoading(true);
      await createAdvice({ ...values, advice_date: `${values.advice_date} ${values.advice_time}` });
      formik.resetForm();
      Alert.alert('¡Felicidades!', '¡Has registrado la asesoría con éxito!');
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
