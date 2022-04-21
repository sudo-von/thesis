import React, { useState } from 'react';
import Input from 'src/components/Input/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';

type TimepickerProps = {
  label: string,
  field: FieldInputProps<any>,
  form: FormikProps<any>,
  meta: FieldMetaProps<any>,
};

const Timepicker = ({
  label, field, form, meta,
}:TimepickerProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleTime = () => {
    if (field.value) {
      return moment(field.value, 'HH:mm').toDate();
    }
    return new Date();
  };

  const onChange = (event: Event, date?: Date): void => {
    if (event.type === 'dismissed') {
      setVisible(false);
    } else {
      setVisible(false);
      form.setFieldValue(field.name, moment(date).format('HH:mm'));
      form.setFieldError(field.name, undefined);
    }
  };

  return (
    <View>
      <View>
        <Input
          disabled
          label={label}
          right={(
            <TextInput.Icon
              onPress={() => setVisible(true)}
              color="gray"
              name="clock-outline"
            />
          )}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          error={meta.error}
        />
      </View>
      {visible && (
        <DateTimePicker
          testID="timePicker"
          value={handleTime()}
          mode="time"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Timepicker;
