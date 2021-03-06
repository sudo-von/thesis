import React from 'react';
import { Bold, Small } from 'src/components';
import {
  Badge,
  Card,
  Title,
  useTheme,
} from 'react-native-paper';
import { Department } from 'src/entities/department';
import { formatDepartmentCost, handleDepartmentStatus } from 'src/helpers/department-helper';
import departmentCardContentStyle from './DepartmentCardContent.styles';

type DepartmentCardContentProps = {
  department: Department
};

const DepartmentCardContent = ({ department }:DepartmentCardContentProps):JSX.Element => {
  const { colors } = useTheme();
  const cost = formatDepartmentCost(department.cost);
  const status = handleDepartmentStatus(department.available);
  const styles = departmentCardContentStyle(colors);
  return (
    <Card.Content style={styles.cardContent}>
      <Badge style={styles.badge}>{status}</Badge>
      <Title style={styles.title}><Bold>{cost}</Bold></Title>
      <Small style={styles.small}>{department.user.name}</Small>
      <Small style={styles.small}>
        <Bold>{department.neighborhood}</Bold> / <Bold>{department.street}</Bold>
      </Small>
    </Card.Content>
  );
};

export default DepartmentCardContent;
