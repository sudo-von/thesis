import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import {
  Container, Small, Bold, Loader,
} from 'src/components';
import { Title } from 'react-native-paper';
import { getUserByID } from 'src/services/user.service';
import useUser from 'src/hooks/useUser';
import { TinyUser } from 'src/entities/user';
import updateAccountStyles from './UpdateAccount.styles';
import UpdateAccountForm from './Components/UpdateAccountForm/UpdateAccountForm';

const UpdateAccountConfigurationPage = () => {
  const { user } = useUser();
  const { userId } = user;
  const [account, setAccount] = useState<TinyUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchAccount = async () => {
      try {
        const response:TinyUser = await getUserByID(userId);
        setAccount(response);
      } catch (e) {
        Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    searchAccount();
  }, []);

  return (
    <Container style={updateAccountStyles.container}>
      <View style={updateAccountStyles.view}>
        <Title><Bold>¡Manten actualizados{'\n'}tus datos en todo momento!</Bold></Title>
        <Small>Modifica tu información personal para estar al día.</Small>
      </View>
      { loading
        ? <Loader size={80} loadingMessage="Cargando contacto" />
        : <UpdateAccountForm account={account} />}
    </Container>
  );
};

export default UpdateAccountConfigurationPage;
