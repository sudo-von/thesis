import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { DrawerParamList } from 'src/router/Router';
import addButtonStyles from './AddButton.styles';

const AddButton = (route: keyof DrawerParamList) => {
  const navigation = useNavigation();
  const navigate = () => navigation.navigate(route);
  const theme = useTheme();
  return (
    <AntDesign name="plus" size={24} color={theme.colors.background} onPress={navigate} style={addButtonStyles.button} />
  );
};

export default AddButton;
