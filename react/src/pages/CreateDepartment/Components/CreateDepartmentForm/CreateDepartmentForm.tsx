import React from 'react';
import { View } from 'react-native';
import { FieldAttributes, Formik, FormikHelpers } from 'formik';
import { Input, Button, Error } from 'src/components';
import useDepartment from 'src/hooks/useDepartment';
import createDepartmentFormStyles from './CreateDepartmentForm.styles';

type CreateDepartmentFormFields = {
  cost?: string,
  description?: string,
  neighborhood?: string,
  street?: string,
};

const CreateDepartmentForm = ():JSX.Element => {
  const { loading, error, handleCreateDepartment } = useDepartment();

  const initialValues:CreateDepartmentFormFields = {
    cost: '',
    description: '',
    neighborhood: '',
    street: '',
  };

  const handleValidation = ({
    cost, description, neighborhood, street,
  }:CreateDepartmentFormFields) => {
    const errors:CreateDepartmentFormFields = {};
    if (!cost) {
      errors.cost = 'Costo requerido';
    } else if (!/^\d+\.\d+$|^\d+$/.test(cost)) {
      errors.cost = 'El costo sólo debe contener valores númericos';
    }
    if (!description) {
      errors.description = 'Descripción requerida';
    }
    if (!neighborhood) {
      errors.neighborhood = 'Colonia requerida';
    }
    if (!street) {
      errors.street = 'Calle requerida';
    }
    return errors;
  };

  const onSubmit = (
    values: CreateDepartmentFormFields,
    formik: FormikHelpers<CreateDepartmentFormFields>,
  ) => {
    handleCreateDepartment(values, formik.resetForm);
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
          { error
            && <Error message={error} />}
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
