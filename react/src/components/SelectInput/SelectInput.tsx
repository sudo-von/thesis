import React, { useState } from 'react';
import { View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { HelperText } from 'react-native-paper';
import { FieldInputProps, FormikProps } from 'formik';
import selectInputStyles from './SelectInput.styles';

export type Option = {
  label: string,
  value: any,
};

type SelectInputProps = {
  label: string,
  data: Option[],
  field: FieldInputProps<any>,
  form: FormikProps<any>,
  error?: string,
};

const SelectInput = ({
  field, form, error, label, data,
}:SelectInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectedOption = (value:any) => {
    form.setFieldValue(field.name, value);
    form.setFieldError(field.name, undefined);
  };

  const showDropDown = (): void => {
    setIsVisible(true);
  };

  const hideDropDown = (): void => {
    setIsVisible(false);
  };

  return (
    <View style={selectInputStyles.containerStyle}>
      <DropDown
        label={label}
        mode="outlined"
        visible={isVisible}
        showDropDown={showDropDown}
        onDismiss={hideDropDown}
        value={field.value}
        setValue={handleSelectedOption}
        list={data}
      />
      { error
        && (
          <HelperText
            padding="none"
            type="error"
            visible
          >
            {error}
          </HelperText>
        )}
    </View>
  );
};

export default SelectInput;
