import React from 'react';
import { View } from 'react-native';
import { FieldAttributes, Formik, FormikHelpers } from 'formik';
import { Input, Button } from 'src/components';
import { DepartmentPayload } from 'src/entities/department';
import createDepartmentFormStyles from './CreateDepartmentForm.styles';

export type CreateDepartmentFormFields = {
  cost?: string,
  description?: string,
  neighborhood?: string,
  street?: string,
};

export type CreateDepartmentFormProps = {
  error: boolean,
  loading: boolean,
  initialValues: CreateDepartmentFormFields
  handleValidation: ({
    cost, description, neighborhood, street,
  }) => CreateDepartmentFormFields,
  handleCreateDepartment: (
    departmentPayload:DepartmentPayload,
  ) => Promise<void>,
};

const CreateDepartmentForm = ({
  error,
  loading,
  initialValues,
  handleValidation,
  handleCreateDepartment,
}):JSX.Element => {
  const handleOnSubmit = async (
    values: CreateDepartmentFormFields,
    formik: FormikHelpers<CreateDepartmentFormFields>,
  ): Promise<void> => {
    const payload:DepartmentPayload = {
      description: values.description ?? '',
      street: values.street ?? '',
      neighborhood: values.neighborhood ?? '',
      cost: values.cost ? parseFloat(values.cost) : 0,
    };
    await handleCreateDepartment(payload);
    if (!error) {
      formik.resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validate={handleValidation}
      onSubmit={handleOnSubmit}
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
            keyboardType="phone-pad"
            onChangeText={handleChange('cost')}
            onBlur={handleBlur('cost')}
            value={values.cost}
            error={errors.cost}
          />
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
            loadingMessage="Registrando departamento..."
            onPress={handleSubmit}
            style={createDepartmentFormStyles.button}
          >
            Registrar departamento
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default CreateDepartmentForm;
