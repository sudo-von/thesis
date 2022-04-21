import React from 'react';
import { Card } from 'react-native-paper';
import { Department } from 'src/entities/department';
import DepartmentCardContent from './DepartmentCardContent/AdviceCardContent';
import DepartmentCardActions from './DepartmentCardActions/DepartmentCardActions';
import departmentCardStyles from './DepartmentCard.styles';

type DepartmentCardProps = {
  userID: string,
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>,
  department: Department
};

const DepartmentCard = ({ department, userID, setDepartments }: DepartmentCardProps) => (
  <Card style={departmentCardStyles.card}>
    <DepartmentCardContent
      department={department}
    />
    <DepartmentCardActions
      id={department.id}
      departmentUser={department.user}
      setDepartments={setDepartments}
      userID={userID}
    />
  </Card>
);

export default DepartmentCard;
