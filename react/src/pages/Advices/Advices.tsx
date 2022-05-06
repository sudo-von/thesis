import React from 'react';
import { View, ScrollView } from 'react-native';
import { Loader, Container, Error } from 'src/components';
import { useTheme } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useAdvices from 'src/hooks/useAdvices';
import advicesStyles from './Advices.styles';
import AdviceCard from './Components/AdviceCard/AdviceCard';

const Advices = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { userId } = user;

  const {
    error,
    loading,
    advices,
    handleAssist,
    handleAdvices,
  } = useAdvices();

  const styles = advicesStyles(colors.background);

  return (
    <Container style={styles.container}>
      { loading
        ? <View style={styles.loader}><Loader loadingMessage="Cargando asesorías..." /></View>
        : advices
        && (
        <ScrollView>
          {advices.map((advice) => (
            <AdviceCard
              handleAdvices={handleAdvices}
              handleAssist={handleAssist}
              key={advice.id}
              userID={userId}
              advice={advice}
            />
          ))}
        </ScrollView>
        )}
      { error
        && <Error message={error} /> }
    </Container>
  );
};

export default Advices;
