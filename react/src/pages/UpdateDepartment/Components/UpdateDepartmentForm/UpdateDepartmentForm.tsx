import React from 'react';
import { View } from 'react-native';
import {
  Field, FieldAttributes, Formik, FormikHelpers,
} from 'formik';
import {
  Button, Error, Input, SelectInput,
} from 'src/components';
import useDepartment from 'src/hooks/useDepartment';
import { Department } from 'src/entities/department';
import { Option } from 'src/components/SelectInput/SelectInput';
import updateDepartmentFormStyles from './UpdateDepartmentForm.styles';

type UpdateDepartmentFormFields = {
  id?: string,
  available?: boolean,
  cost?: string,
  description?: string,
  neighborhood?: string,
  street?: string,
};

type UpdateDepartmentFormProps = {
  department?: Department,
};

const UpdateDepartmentForm = ({ department }:UpdateDepartmentFormProps) => {
  const { loading, error, handleUpdateDepartment } = useDepartment();

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

  const initialValues:UpdateDepartmentFormFields = {
    cost: department?.cost.toString(),
    description: department?.description,
    neighborhood: department?.neighborhood,
    street: department?.street,
    available: department?.available,
  };

  const handleValidation = ({
    cost, description, neighborhood, street,
  }:UpdateDepartmentFormFields) => {
    const errors:UpdateDepartmentFormFields = {};
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
    values: UpdateDepartmentFormFields,
    formik: FormikHelpers<UpdateDepartmentFormFields>,
  ) => {
    handleUpdateDepartment(department?.id, values, formik.resetForm);
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
          {error
            && <Error message={error} />}
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
