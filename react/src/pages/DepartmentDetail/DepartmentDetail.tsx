import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {
  Container, Loader, Error, Success, Shape, Small,
} from 'src/components';
import { Title, useTheme } from 'react-native-paper';
import { useSingleDepartment } from 'src/hooks/useSingleDepartment';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DrawerParamList } from 'src/router/Router';
import departmentDetailStyles from './DepartmentDetail.styles';
import DepartmentCard from './Components/DepartmentCard/DepartmentCard';

const image = require('assets/figma/department.png');

const DepartmentDetail = () => {
  const { params } = useRoute<RouteProp<DrawerParamList, 'DepartmentDetail'>>();
  const { id } = params;
  const {
    loading,
    error,
    success,
    department,
  } = useSingleDepartment(id);
  const { colors } = useTheme();
  const styles = departmentDetailStyles(colors.background);
  return (
    <Container style={styles.container}>
      <Shape backgroundColor={colors.primary} borderRadius={30} size={250} />
      <View style={styles.view}>
        <Image style={styles.image} source={image} />
        <View style={styles.textView}>
          <Title style={styles.title}>
            Consulta todos los detalles!
          </Title>
          <Small style={styles.small}>
            Verifica todos los detalles del departamento antes de tomar una decisión.
          </Small>
        </View>
      </View>
      { loading
        ? <View style={styles.loader}><Loader loadingMessage="Cargando departamento..." /></View>
        : department && (
          <SafeAreaView>
            <ScrollView>
              <DepartmentCard
                department={department}
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

export default DepartmentDetail;
