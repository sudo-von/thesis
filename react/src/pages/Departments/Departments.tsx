import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Loader, Container, Error,
} from 'src/components';
import { useTheme } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useDepartments from 'src/hooks/useDepartments';
import departmentsStyle from './Departments.styles';
import DepartmentCard from './Components/DepartmentCard/DepartmentCard';

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
