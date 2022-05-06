import React from 'react';
import { Card } from 'react-native-paper';
import { Department } from 'src/entities/department';
import DepartmentCardContent from './DepartmentCardContent/DepartmentCardContent';
import departmentCardStyles from './DepartmentCard.styles';

type DepartmentCardProps = {
  department: Department
};

const DepartmentCard = ({ department }: DepartmentCardProps) => (
  <Card style={departmentCardStyles.card}>
    <DepartmentCardContent
      department={department}
    />
  </Card>
);

export default DepartmentCard;
