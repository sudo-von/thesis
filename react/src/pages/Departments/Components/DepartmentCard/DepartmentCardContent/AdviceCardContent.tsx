import React from 'react';
import { View } from 'react-native';
import { Bold, Small, Hr } from 'src/components';
import {
  Card, Title, Paragraph,
} from 'react-native-paper';
import { Department } from 'src/entities/department';
import adviceCardContentStyle from './AdviceCardContent.styles';

type DepartmentCardContentProps = {
  department: Department
};

const DepartmentCardContent = ({ department }:DepartmentCardContentProps):JSX.Element => {
  const formatedCost = `$${department.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  return (
    <Card.Content style={adviceCardContentStyle.cardContent}>
      <View style={adviceCardContentStyle.header}>
        <Title style={adviceCardContentStyle.user}>
          <Bold>{department.user.name}</Bold>
        </Title>
        <Small>{department.user.email}</Small>
      </View>
      <Hr />
      <View style={adviceCardContentStyle.content}>
        <Paragraph><Bold>Colonia</Bold>: {department.neighborhood}</Paragraph>
        <Paragraph><Bold>Calle</Bold>: {department.street}</Paragraph>
        <Paragraph><Bold>Costo</Bold>: {formatedCost}</Paragraph>
        <Paragraph><Bold>Descrpición</Bold>: {department.description}</Paragraph>
      </View>
      <Hr />
    </Card.Content>
  );
};

export default DepartmentCardContent;
