import React from 'react';
import { Bold, Small } from 'src/components';
import {
  Badge,
  Card,
  Paragraph,
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
      <Paragraph style={styles.title}><Bold>Costo mensual</Bold>:
        {' '}<Small style={styles.description}>{cost}</Small>
      </Paragraph>
      <Paragraph style={styles.title}><Bold>Renta</Bold>:
        {' '}<Small style={styles.description}>{department.user.name}</Small>
      </Paragraph>
      <Paragraph style={styles.title}><Bold>Calle</Bold>:
        {' '}<Small style={styles.description}>{department.street}</Small>
      </Paragraph>
      <Paragraph style={styles.title}><Bold>Colonia</Bold>:
        {' '}<Small style={styles.description}>{department.neighborhood}</Small>
      </Paragraph>
      <Paragraph style={styles.title}><Bold>Descripción</Bold>:
        {' '}<Small style={styles.description}>{department.description}</Small>
      </Paragraph>
    </Card.Content>
  );
};

export default DepartmentCardContent;
