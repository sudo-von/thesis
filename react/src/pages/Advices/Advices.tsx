import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  Loader,
  Container,
  Error,
  Shape,
  Small,
} from 'src/components';
import { Caption, useTheme } from 'react-native-paper';
import useUser from 'src/hooks/useUser';
import useAdvices from 'src/hooks/useAdvices';
import advicesStyles from './Advices.styles';
import AdviceCard from './Components/AdviceCard/AdviceCard';

const image = require('assets/figma/department.png');

const Advices = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { userId } = user;

  const {
    error,
    loading,
    advices,
    handleAdvices,
  } = useAdvices();

  const styles = advicesStyles(colors.background);

  return (
    <Container style={styles.container}>
      {/* <Shape backgroundColor={colors.primary} borderRadius={25} size={325} />
      <View style={styles.view}>
        <Image style={styles.image} source={image} />
        <Caption style={styles.caption}>¿Buscas una asesoría o te gustaría anunciar una?</Caption>
        <Small style={styles.small}>¡Estás en el lugar adecuado!</Small>
      </View>
      */}
      { loading
        ? <View style={styles.loader}><Loader loadingMessage="Cargando asesorías..." /></View>
        : advices
        && (
        <ScrollView>
          {advices.map((advice) => (
            <AdviceCard
              handleAdvices={handleAdvices}
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
