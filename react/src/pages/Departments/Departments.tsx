import React from 'react';
import { View, ScrollView } from 'react-native';
import { Loader, Container } from 'src/components';
import { FAB, useTheme } from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import useUser from 'src/hooks/useUser';
import useDepartments from 'src/hooks/useDepartments';
import { useNavigation } from '@react-navigation/native';
import departmentsStyle from './Departments.styles';
import DepartmentCard from './Components/DepartmentCard/DepartmentCard';

const Departments = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = useUser();
  const { userId } = user;
  const { loading, departments, setDepartments } = useDepartments();
  const styles = departmentsStyle(colors);

  return (
    <Container style={styles.container}>
      <View style={styles.view}>
        <Tabs style={styles.tabs}>
          <TabScreen label="Todos">
            { loading
              ? <Loader loadingMessage="Cargando departamentos" />
              : (
                <ScrollView>
                  { departments.map((department) => (
                    <DepartmentCard
                      key={department.id}
                      userID={userId}
                      setDepartments={setDepartments}
                      department={department}
                    />
                  ))}
                </ScrollView>
              )}
          </TabScreen>
          <TabScreen label="Mis departamentos">
            { loading
              ? <Loader loadingMessage="Cargando departamentos" />
              : (
                <ScrollView>
                  { departments.map((department) => (
                    <DepartmentCard
                      key={department.id}
                      userID={userId}
                      setDepartments={setDepartments}
                      department={department}
                    />
                  ))}
                </ScrollView>
              )}
          </TabScreen>
        </Tabs>
        <View style={styles.bottomView}>
          <FAB
            icon="plus"
            color={colors.primary}
            style={{ backgroundColor: colors.background }}
            onPress={() => navigation.navigate('CreateDepartment')}
            small
          />
        </View>
      </View>
    </Container>
  );
};

export default Departments;
