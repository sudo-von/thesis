import React from 'react';
import { View } from 'react-native';
import { Bold, Small } from 'src/components';
import { Card, Title } from 'react-native-paper';
import { Department } from 'src/entities/department';
import { formatDepartmentCost } from 'src/helpers/department-helper';
import departmentCardContentStyle from './DepartmentCardContent.styles';

type DepartmentCardContentProps = {
  department: Department
};

const DepartmentCardContent = ({ department }:DepartmentCardContentProps):JSX.Element => {
  const cost = formatDepartmentCost(department.cost);
  return (
    <Card.Content style={departmentCardContentStyle.cardContent}>
      <View style={departmentCardContentStyle.header}>
        <Title><Bold>{cost}</Bold></Title>
        <Small>{department.neighborhood} / {department.street}</Small>
      </View>
    </Card.Content>
  );
};

export default DepartmentCardContent;
