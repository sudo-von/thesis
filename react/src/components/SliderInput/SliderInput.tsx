import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from 'react-native-paper';
import Small from 'src/components/Small/Small';
import sliderInputStyles from './SliderInput.styles';

type SliderInputProps = {
  initialValue: number,
  minimumValue: number,
  maximumValue: number,
  changeValue: (value: number) => void,
  minimumText: string,
  maximumText: string,
};

const SliderInput = ({
  initialValue, minimumValue, maximumValue, changeValue, minimumText, maximumText,
}: SliderInputProps): JSX.Element => {
  const { colors } = useTheme();
  const handleValueChange = (value: number) => changeValue(value);
  return (
    <View>
      <Slider
        style={sliderInputStyles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.primary}
        thumbTintColor={colors.primary}
        value={initialValue}
        onValueChange={handleValueChange}
      />
      <View style={sliderInputStyles.view}>
        <Small>{minimumText}</Small>
        <Small>{maximumText}</Small>
      </View>
    </View>
  );
};

export default SliderInput;
