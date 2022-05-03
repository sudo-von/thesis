import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  Loader, Container, Small, Shape, Error,
} from 'src/components';
import { Caption, useTheme } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useDepartments from 'src/hooks/useDepartments';
import departmentsStyle from './Departments.styles';
import DepartmentCard from './Components/DepartmentCard/DepartmentCard';

const image = require('assets/figma/department.png');

const Departments = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { userId } = user;

  const {
    loading,
    error,
    departments,
    handleDepartments,
  } = useDepartments();

  const styles = departmentsStyle(colors.background);

  return (
    <Container style={styles.container}>
      <Shape backgroundColor={colors.primary} borderRadius={25} size={325} />
      <View style={styles.view}>
        <Image style={styles.image} source={image} />
        <Caption style={styles.caption}>¿Buscas departamento o te gustaría anunciar uno?</Caption>
        <Small style={styles.small}>¡Estás en el lugar adecuado!</Small>
      </View>
      { loading
        ? <View style={styles.loader}><Loader loadingMessage="Cargando departamentos..." /></View>
        : departments
        && (
        <ScrollView>
          {departments.map((department) => (
            <DepartmentCard
              handleDepartments={handleDepartments}
              key={department.id}
              userID={userId}
              department={department}
            />
          ))}
        </ScrollView>
        )}
      { error
        && <Error message={error} /> }
    </Container>
  );
};

export default Departments;
