import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Loader, Container, Small } from 'src/components';
import { Caption, useTheme } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useDepartments from 'src/hooks/useDepartments';
import { Shapes } from 'react-native-background-shapes';
import departmentsStyle from './Departments.styles';
import DepartmentCard from './Components/DepartmentCard/DepartmentCard';

const image = require('assets/figma/apartment3.png');

const Departments = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { userId } = user;
  const { loading, departments } = useDepartments();
  const styles = departmentsStyle(colors.background);
  return (
    <Container style={styles.container}>
      <Shapes
        primaryColor={colors.primary}
        height={2.4}
        borderRadius={30}
        figures={[]}
      />
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
              key={department.id}
              userID={userId}
              department={department}
            />
          ))}
        </ScrollView>
        )}
    </Container>
  );
};

export default Departments;
