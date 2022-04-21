import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerParamList } from 'src/router/router';
import { Text, Card, IconButton } from 'react-native-paper';
import navigationCardStyles from './NavigationCard.styles';
import Bold from '../Bold/Bold';
import Small from '../Small/Small';

export type NavigationCardProps = {
  url: keyof DrawerParamList,
  title: string,
  description: string,
  icon: string,
  color: string,
  backgroundColor: string,
};

const NavigationCard = ({
  url, title, description, icon, color, backgroundColor,
}: NavigationCardProps) => {
  const navigation = useNavigation();
  const handleNavigation = () => navigation.navigate(url);
  const styles = navigationCardStyles({ backgroundColor });
  return (
    <Card style={styles.card} onPress={handleNavigation}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconView}>
          <IconButton icon={icon} color={color} style={styles.iconButton} />
        </View>
        <View style={styles.contentView}>
          <Text><Bold>{title}</Bold></Text>
          <Small>{description}</Small>
        </View>
      </Card.Content>
    </Card>
  );
};

export default NavigationCard;
