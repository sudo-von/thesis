import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import {
  Bold, Small, Container, Loader, Error, Success,
} from 'src/components';
import { Title } from 'react-native-paper';
import { useSingleDepartment } from 'src/hooks/useSingleDepartment';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DrawerParamList } from 'src/router/Router';
import updateDepartmentStyles from './UpdateDepartment.styles';
import UpdateDepartmentForm, { UpdateDepartmentFormFields } from './Components/UpdateDepartmentForm/UpdateDepartmentForm';

const UpdateDepartment = () => {
  const { params } = useRoute<RouteProp<DrawerParamList, 'UpdateDepartment'>>();
  const { id } = params;
  const {
    loading,
    error,
    success,
    department,
    handleUpdateDepartment,
  } = useSingleDepartment(id);

  const initialValues: UpdateDepartmentFormFields = {
    id: department?.id,
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

  return (
    <Container style={updateDepartmentStyles.container}>
      <View style={updateDepartmentStyles.view}>
        <Title><Bold>Actualiza tu departamento!</Bold></Title>
        <Small>Modifica la información de tu departamento en cualquier momento.</Small>
      </View>
      { loading
        ? <View style={updateDepartmentStyles.loader}><Loader loadingMessage="Cargando departamento..." /></View>
        : department && (
          <SafeAreaView>
            <ScrollView>
              <UpdateDepartmentForm
                loading={loading}
                initialValues={initialValues}
                handleValidation={handleValidation}
                handleUpdateDepartment={handleUpdateDepartment}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      { error
          && <Error message={error} /> }
      { success
          && <Success message={success} /> }
    </Container>
  );
};

export default UpdateDepartment;
