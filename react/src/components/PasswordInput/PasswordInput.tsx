import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Input, { InputProps } from 'src/components/Input/Input';

const PasswordInput = (
  {
    value, label, error, onChangeText, onBlur,
  }: InputProps,
): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);
  const handleVisibility = (): void => {
    setIsVisible(!isVisible);
  };
  return (
    <Input
      label={label}
      secureTextEntry={isVisible}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      right={(
        <TextInput.Icon
          onPress={handleVisibility}
          color="gray"
          name={isVisible ? 'eye-off' : 'eye'}
        />
      )}
      error={error}
    />
  );
};

export default PasswordInput;
