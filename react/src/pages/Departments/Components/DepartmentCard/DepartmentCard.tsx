import React from 'react';
import { Card } from 'react-native-paper';
import { Department } from 'src/entities/department';
import { Loader, Error } from 'src/components';
import useDepartmentCard from 'src/hooks/useDepartmentCard';
import { View } from 'react-native';
import DepartmentCardContent from './DepartmentCardContent/DepartmentCardContent';
import DepartmentCardActions from './DepartmentCardActions/DepartmentCardActions';
import departmentCardStyles from './DepartmentCard.styles';

type DepartmentCardProps = {
  userID: string,
  department: Department
};

const DepartmentCard = ({ department, userID }: DepartmentCardProps) => {
  const {
    loading,
    error,
    handleEmail,
    handleUpdate,
    handleDeleteModal,
  } = useDepartmentCard(department.id, department.user.email);
  return (
    <Card style={departmentCardStyles.card}>
      <DepartmentCardContent
        department={department}
      />
      { loading
        ? (
          <View style={{ marginBottom: 20 }}>
            <Loader size={20} showMessage={false} />
          </View>
        )
        : (
          <DepartmentCardActions
            departmentUserID={department.user.id}
            userID={userID}
            handleEmail={handleEmail}
            handleUpdate={handleUpdate}
            handleDeleteModal={handleDeleteModal}
          />
        )}
      { error
      && <Error message={error} /> }
    </Card>
  );
};

export default DepartmentCard;
