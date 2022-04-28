import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import backButtonStyles from './BackButton.styles';

const BackButton = () => {
  const navigation = useNavigation();
  const navigate = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };
  const theme = useTheme();
  return (
    <Ionicons name="arrow-back" size={24} color={theme.colors.background} onPress={navigate} style={backButtonStyles.button} />
  );
};

export default BackButton;
