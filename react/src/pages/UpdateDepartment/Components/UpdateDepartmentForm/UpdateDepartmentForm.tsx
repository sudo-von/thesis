import React from 'react';
import { View } from 'react-native';
import {
  Field, FieldAttributes, Formik,
} from 'formik';
import {
  Button, Input, SelectInput,
} from 'src/components';
import { UpdateDepartmentPayload } from 'src/entities/department';
import { Option } from 'src/components/SelectInput/SelectInput';
import updateDepartmentFormStyles from './UpdateDepartmentForm.styles';

const options:Option[] = [
  {
    label: 'Disponible',
    value: true,
  },
  {
    label: 'Rentado',
    value: false,
  },
];

export type UpdateDepartmentFormFields = {
  id?: string,
  available?: boolean,
  cost?: string,
  description?: string,
  neighborhood?: string,
  street?: string,
};

type UpdateDepartmentFormProps = {
  loading: boolean,
  initialValues: UpdateDepartmentFormFields,
  handleValidation: ({
    id,
    available,
    cost,
    description,
    neighborhood,
    street,
  }:UpdateDepartmentFormFields) => UpdateDepartmentFormFields,
  handleUpdateDepartment: (updateDepartmentPayload: UpdateDepartmentPayload) => Promise<void>
};

const UpdateDepartmentForm = ({
  loading,
  initialValues,
  handleValidation,
  handleUpdateDepartment,
}:UpdateDepartmentFormProps) => {
  const onSubmit = (
    values: UpdateDepartmentFormFields,
  ) => {
    const payload:UpdateDepartmentPayload = {
      id: values.id ?? '',
      description: values.description ?? '',
      street: values.street ?? '',
      neighborhood: values.neighborhood ?? '',
      cost: values.cost ? parseFloat(values.cost) : 0,
      available: values.available ?? false,
    };
    handleUpdateDepartment(payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validate={handleValidation}
      onSubmit={onSubmit}
    >
      {({
        handleChange, handleBlur, handleSubmit, errors, values,
      }:FieldAttributes<any>) => (
        <View>
          <Input
            label="Ingresa la calle"
            onChangeText={handleChange('street')}
            onBlur={handleBlur('street')}
            value={values.street}
            error={errors.street}
          />
          <Input
            label="Ingresa la colonia"
            onChangeText={handleChange('neighborhood')}
            onBlur={handleBlur('neighborhood')}
            value={values.neighborhood}
            error={errors.neighborhood}
          />
          <Input
            label="Ingresa el costo (MXN)"
            keyboardType="numeric"
            onChangeText={handleChange('cost')}
            onBlur={handleBlur('cost')}
            value={values.cost}
            error={errors.cost}
          />
          <Field name="available">
            {({ field, form }:FieldAttributes<any>) => (
              <SelectInput
                label="Selecciona el estatus del departamento"
                data={options}
                field={field}
                form={form}
                error={errors.available}
              />
            )}
          </Field>
          <Input
            label="Ingresa la descripción"
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            error={errors.description}
            numberOfLines={5}
            multiline
          />
          <Button
            loading={loading}
            loadingMessage="Actualizando departamento..."
            onPress={handleSubmit}
            style={updateDepartmentFormStyles.button}
          >
            Actualizar departamento
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default UpdateDepartmentForm;
