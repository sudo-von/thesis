import React from 'react';
import { Card } from 'react-native-paper';
import { Department } from 'src/entities/department';
import DepartmentCardContent from './DepartmentCardContent/DepartmentCardContent';
import DepartmentCardActions from './DepartmentCardActions/DepartmentCardActions';
import departmentCardStyles from './DepartmentCard.styles';

type DepartmentCardProps = {
  userID: string,
  department: Department
};

const DepartmentCard = ({ department, userID }: DepartmentCardProps) => (
  <Card style={departmentCardStyles.card}>
    <DepartmentCardContent
      department={department}
    />
    <DepartmentCardActions
      id={department.id}
      departmentUser={department.user}
      userID={userID}
    />
  </Card>
);

export default DepartmentCard;
