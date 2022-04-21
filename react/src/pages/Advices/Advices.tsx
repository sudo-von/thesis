import React from 'react';
import { View } from 'react-native';
import { Loader, Container } from 'src/components';
import { IconButton, useTheme } from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { useNavigation } from '@react-navigation/native';
import useUser from 'src/hooks/useUser';
import useAdvices from 'src/hooks/useAdvices';
import AdvicesList from './Components/AdvicesList/AdvicesList';
import advicesStyles from './Advices.styles';

const AdvicesPage = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = useUser();
  const { userId } = user;

  const {
    loading,
    advices,
    setAdvices,
    attendedAdvices,
    teachedAdvices,
  } = useAdvices(userId);

  const styles = advicesStyles(colors);

  return (
    <Container style={styles.container}>
      { loading
        ? <Loader loadingMessage="Cargando asesorías" />
        : (
          <View style={styles.view}>
            <Tabs>
              <TabScreen label="Todas">
                <AdvicesList
                  advices={advices}
                  userID={userId}
                  setAdvices={setAdvices}
                />
              </TabScreen>
              <TabScreen label="Por asistir">
                <AdvicesList
                  advices={attendedAdvices}
                  userID={userId}
                  setAdvices={setAdvices}
                />
              </TabScreen>
              <TabScreen label="Por dar">
                <AdvicesList
                  advices={teachedAdvices}
                  userID={userId}
                  setAdvices={setAdvices}
                />
              </TabScreen>
            </Tabs>
            <View style={styles.bottomView}>
              <IconButton
                icon="plus"
                color="white"
                onPress={() => navigation.navigate('CreateAdivce')}
                hasTVPreferredFocus
                tvParallaxProperties
              />
            </View>
          </View>
        )}
    </Container>
  );
};

export default AdvicesPage;
