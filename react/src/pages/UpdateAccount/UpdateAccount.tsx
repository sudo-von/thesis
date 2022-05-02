import React from 'react';
import { View } from 'react-native';
import {
  Container, Small, Bold, Loader, Error, Success,
} from 'src/components';
import { Title } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import { ScrollView } from 'react-native-gesture-handler';
import useSingleUser from 'src/hooks/useSingleUser';
import updateAccountStyles from './UpdateAccount.styles';
import UpdateAccountForm, { UpdateAccountFormFields } from './Components/UpdateAccountForm/UpdateAccountForm';

const UpdateAccount = () => {
  const {
    user: localUser,
    handleUpdate,
    loading: updateLoading,
    error: updateError,
    success,
  } = useUser();
  const { userId } = localUser;
  const { user, error, loading } = useSingleUser(userId);

  const initialValues:UpdateAccountFormFields = {
    name: user?.name,
    birth_date: user?.birthDate,
    email: user?.email,
    registration_number: user?.registrationNumber,
  };

  const handleValidation = (
    {
      name, birth_date, email, registration_number,
    }:UpdateAccountFormFields,
  ): UpdateAccountFormFields => {
    const errors:UpdateAccountFormFields = {};
    if (!name) {
      errors.name = 'Nombre requerido';
    }
    if (!birth_date) {
      errors.birth_date = 'Fecha de nacimiento requerida';
    }
    if (!email) {
      errors.email = 'Correo requerido';
    }
    if (!registration_number) {
      errors.registration_number = 'Matrícula requerida';
    } else if (registration_number?.length !== 8) {
      errors.registration_number = 'La matrícula sólo puede 8 dígitos';
    }
    return errors;
  };

  return (
    <Container style={updateAccountStyles.container}>
      <View style={updateAccountStyles.view}>
        <Title><Bold>¡Manten actualizados{'\n'}tus datos en todo momento!</Bold></Title>
        <Small>Modifica tu información personal para estar al día.</Small>
      </View>
      { loading
        ? (
          <View style={updateAccountStyles.loader}>
            <Loader loadingMessage="Cargando información de la cuenta..." size={85} />
          </View>
        )
        : user && (
          <ScrollView>
            <UpdateAccountForm
              account={user}
              loading={updateLoading}
              handleUpdate={handleUpdate}
              initialValues={initialValues}
              handleValidation={handleValidation}
            />
          </ScrollView>
        )}
      {error
        && <Error message={error} /> }
      { updateError
        && <Error message={updateError} /> }
      {success
        && <Success message={success} /> }
    </Container>
  );
};

export default UpdateAccount;
