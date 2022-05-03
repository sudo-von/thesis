import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import {
  Bold,
  Small,
  Container,
  Error,
  Success,
} from 'src/components';
import { Title } from 'react-native-paper';
import useDepartment from 'src/hooks/useDepartment';
import createDepartmentStyles from './CreateDepartment.styles';
import CreateDepartmentForm, { CreateDepartmentFormFields } from './Components/CreateDepartmentForm/CreateDepartmentForm';

const CreateDepartment = () => {
  const {
    loading,
    error,
    success,
    handleCreateDepartment,
  } = useDepartment();

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

  return (
    <Container style={createDepartmentStyles.container}>
      <View style={createDepartmentStyles.view}>
        <Title><Bold>Anuncia un departamento!</Bold></Title>
        <Small>
          Podrás brindarle una oportunidad a tus compañeros para
          encontrar un lugar que les permita continuar con sus estudios.
        </Small>
      </View>
      <SafeAreaView>
        <ScrollView>
          <CreateDepartmentForm
            error={error}
            loading={loading}
            initialValues={initialValues}
            handleValidation={handleValidation}
            handleCreateDepartment={handleCreateDepartment}
          />
        </ScrollView>
      </SafeAreaView>
      { error
      && <Error message={error} /> }
      { success
      && <Success message={success} /> }
    </Container>
  );
};

export default CreateDepartment;
