import React from 'react';
import { Image, View } from 'react-native';
import {
  Bold,
  Container,
  Error,
  Loader,
  Shape,
  Small,
} from 'src/components';
import useUser from 'src/hooks/useUser';
import useLocation from 'src/hooks/useLocation';
import { Title, useTheme } from 'react-native-paper';
import useTip from 'src/hooks/useTip';
import panicButtonStyle from './PanicButton.styles';

const image = require('assets/figma/location.png');

const PanicButton = ():JSX.Element => {
  const { user } = useUser();
  const { userId } = user;
  const { tip } = useTip();
  const { message, error } = useLocation(userId);
  const { colors } = useTheme();
  const styles = panicButtonStyle(colors.background);
  return (
    <Container>
      <Shape backgroundColor={colors.primary} borderRadius={30} size={250} />
      <View style={styles.view}>
        <Image style={styles.image} source={image} />
        <View style={styles.textView}>
          <Title style={styles.title}>
            <Bold>Precaución</Bold>
          </Title>
          <Small style={styles.small}>
            {tip}
          </Small>
        </View>
      </View>
      <View style={styles.loader}>
        <Loader loadingMessage={message} size={85} />
      </View>
      {error
       && <Error message={error} /> }
    </Container>
  );
};

export default PanicButton;
