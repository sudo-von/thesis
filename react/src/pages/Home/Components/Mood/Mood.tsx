import React from 'react';
import { View, Image } from 'react-native';
import { Dialog, Portal, Title } from 'react-native-paper';
import {
  Small, Button, Fab, SliderInput,
} from 'src/components';
import useMood from 'src/hooks/useMood';
import moodStyles from './Mood.styles';

const sad = require('assets/emojis/sad-emoji.png');
const shocked = require('assets/emojis/shocked-emoji.png');
const happy = require('assets/emojis/happy-emoji.png');
const smiling = require('assets/emojis/smiling-emoji.png');

type MoodProps = {
  initialMoodValue: number,
  minimumValue: number,
  maximumValue: number,
  minimumText: string,
  maximumText: string,
  userId: string,
};

const Mood = ({
  initialMoodValue, minimumValue, maximumValue, minimumText, maximumText, userId,
}:MoodProps): JSX.Element => {
  const {
    loading, mood, show, setMood, handleShow, handleUpdateMood,
  } = useMood(initialMoodValue, userId);
  const onHandleHide = () => handleShow(false);

  const total = (mood * 100) / maximumValue;
  let selectedEmoji;
  if (total <= 25) {
    selectedEmoji = sad;
  } else if (total <= 50) {
    selectedEmoji = shocked;
  } else if (total <= 75) {
    selectedEmoji = happy;
  } else if (total <= 100) {
    selectedEmoji = smiling;
  }

  return (
    <Portal>
      <Dialog visible={show}>
        <Dialog.Content>
          <Fab
            small
            icon="close-thick"
            onPress={onHandleHide}
          />
          <View style={moodStyles.emojiView}>
            <Image
              source={selectedEmoji}
              style={moodStyles.emoji}
            />
          </View>
          <Title style={moodStyles.title}>¿Cómo te sientes?</Title>
          <Small style={moodStyles.small}>
            Nos importas mucho y nos gustaría saber cómo te sientes el día de hoy.
          </Small>
          <View style={moodStyles.sliderInputView}>
            <SliderInput
              initialValue={initialMoodValue}
              minimumValue={minimumValue}
              maximumValue={maximumValue}
              changeValue={setMood}
              minimumText={minimumText}
              maximumText={maximumText}
            />
          </View>
          <Button loading={loading} loadingMessage="Guardando..." onPress={handleUpdateMood}>Guardar estado de ánimo</Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default Mood;
