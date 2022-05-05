import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { Formik, Field, FieldAttributes } from 'formik';
import {
  Input,
  SelectInput,
  Datepicker,
  Timepicker,
  Button,
} from 'src/components';
import { updateAdviceByID } from 'src/services/advice.service';
import { getUniversityByID } from 'src/services/university.service';
import moment from 'moment';
import useUser from 'src/hooks/useUser';
import { Advice } from 'src/entities/advice';
import { Classroom } from 'src/entities/classroom';
import { Option } from 'src/components/SelectInput/SelectInput';
import updateAdviceFormStyles from './UpdateAdviceForm.styles';

export type UpdateAdviceFormFields = {
  subject?: string,
  advice_date?: string,
  advice_time?: string,
  classroom_id?: string,
};

type UpdateAdviceFormProps = {
  loading: boolean,
  initialValues: UpdateAdviceFormFields,
  handleValidation: ({
    subject,
    advice_date,
    advice_time,
    classroom_id,
  }:UpdateAdviceFormFields) => UpdateAdviceFormFields,
  handleUpdateDepartment: (updateDepartmentPayload: UpdateDepartmentPayload) => Promise<void>
};

const UpdateAdviceForm = ({ advice }:UpdateAdviceFormProps): JSX.Element => {
  const { user } = useUser();
  const { universityId } = user;

  const [loading, setLoading] = useState<boolean>(false);
  const [classrooms, setClassrooms] = useState<Option[]>([]);

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


  const onHandleSubmit = async (form:UpdateAdviceFormFields) => {
    try {
      setLoading(true);
      await updateAdviceByID(advice.id, { ...form, advice_date: `${form.advice_date} ${form.advice_time}` });
      Alert.alert('¡Felicidades!', '¡Has actualizado la asesoría con éxito!');
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
                data={classrooms}
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
