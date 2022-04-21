import React from 'react';
import {
  KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData, View,
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import inputStyles from './Input.styles';

export type InputProps = {
  value?: string,
  label?: string,
  error?: string,
  disabled?: boolean,
  secureTextEntry?: boolean,
  right?: React.ReactNode,
  keyboardType?: KeyboardTypeOptions,
  multiline?: boolean,
  numberOfLines?: number,
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  onChangeText?: (e: string | React.ChangeEvent<any>) => void,
};

const Input = (
  {
    disabled, value, label, error, secureTextEntry, right, onChangeText, onBlur, keyboardType,
    multiline, numberOfLines,
  }: InputProps,
): JSX.Element => {
  const { colors } = useTheme();
  return (
    <View>
      <TextInput
        label={label}
        mode="outlined"
        theme={{ colors: { primary: colors.primary } }}
        style={inputStyles.textInput}
        secureTextEntry={secureTextEntry}
        right={right}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
      />
      {error
      && <HelperText type="error" visible>{error}</HelperText>}
    </View>
  );
};

export default Input;
