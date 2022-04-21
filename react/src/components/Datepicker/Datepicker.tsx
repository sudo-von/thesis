import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Input from 'src/components/Input/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { FieldInputProps, FieldMetaProps, FormikProps } from 'formik';

type DatepickerProps = {
  label: string,
  field: FieldInputProps<any>,
  form: FormikProps<any>,
  meta: FieldMetaProps<any>,
};

const Datepicker = ({
  label, field, form, meta,
}:DatepickerProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleDate = () => {
    if (field.value) {
      return moment(field.value, 'YYYY-MM-DD').toDate();
    }
    return new Date();
  };

  const onChange = (event: Event, date?: Date): void => {
    if (event.type === 'dismissed') {
      setVisible(false);
    } else {
      setVisible(false);
      form.setFieldValue(field.name, moment(date).format('YYYY-MM-DD'));
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
              name="calendar"
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
          testID="dateTimePicker"
          value={handleDate()}
          mode="date"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Datepicker;
