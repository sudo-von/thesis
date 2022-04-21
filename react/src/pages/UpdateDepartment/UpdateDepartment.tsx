import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import {
  Bold, Small, Container, Loader,
} from 'src/components';
import { Title } from 'react-native-paper';
import { useSingleDepartment } from 'src/hooks/useSingleDepartment';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DrawerParamList } from 'src/router/router';
import updateDepartmentStyles from './UpdateDepartment.styles';
import UpdateDepartmentForm from './Components/UpdateDepartmentForm/UpdateDepartmentForm';

const UpdateDepartmentPage = () => {
  const { params } = useRoute<RouteProp<DrawerParamList, 'UpdateDepartment'>>();
  const { id } = params;
  const { loading, department } = useSingleDepartment(id);
  return (
    <SafeAreaView>
      <ScrollView>
        <Container style={updateDepartmentStyles.container}>
          <View style={updateDepartmentStyles.view}>
            <Title><Bold>Actualiza tu departamento!</Bold></Title>
            <Small>Modifica la información de tu departamento en cualquier momento.</Small>
          </View>
          { loading
            ? <Loader loadingMessage="Cargando departamento..." />
            : (
              <UpdateDepartmentForm
                department={department}
              />
            )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateDepartmentPage;
