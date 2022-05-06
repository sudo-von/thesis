import React from 'react';
import { Card } from 'react-native-paper';
import { Department } from 'src/entities/department';
import { Loader, Error, Hr } from 'src/components';
import useDepartmentCard from 'src/hooks/useDepartmentCard';
import { View } from 'react-native';
import DepartmentCardContent from './DepartmentCardContent/DepartmentCardContent';
import DepartmentCardActions from './DepartmentCardActions/DepartmentCardActions';
import departmentCardStyles from './DepartmentCard.styles';

type DepartmentCardProps = {
  userID: string,
  department: Department
  handleDepartments: () => Promise<void>,
};

const DepartmentCard = ({ department, userID, handleDepartments }: DepartmentCardProps) => {
  const {
    loading,
    error,
    handleEmail,
    handleUpdate,
    handleDetail,
    handleDeleteModal,
  } = useDepartmentCard(department.id, department.user.email);
  return (
    <Card style={departmentCardStyles.card}>
      <DepartmentCardContent
        department={department}
      />
      <Hr />
      { loading
        ? (
          <View style={departmentCardStyles.view}>
            <Loader size={20} showMessage={false} />
          </View>
        )
        : (
          <DepartmentCardActions
            departmentUserID={department.user.id}
            userID={userID}
            handleEmail={handleEmail}
            handleDetail={handleDetail}
            handleUpdate={handleUpdate}
            handleDeleteModal={handleDeleteModal}
            handleDepartments={handleDepartments}
          />
        )}
      { error
      && <Error message={error} /> }
    </Card>
  );
};

export default DepartmentCard;
