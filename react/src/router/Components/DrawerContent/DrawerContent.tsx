/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import useUser from 'src/hooks/useUser';
import { Divider, Title } from 'react-native-paper';
import { Small } from 'src/components';
import drawerContentStyles from './DrawerContent.styles';

const DrawerContent = (props:any) => {
  const { user } = useUser();
  const { email, universityProfilePicture, userName } = user;
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={drawerContentStyles.imageContainer}>
          <View>
            <Image style={drawerContentStyles.image} source={{ uri: universityProfilePicture }} />
            <Title style={drawerContentStyles.title}>{userName}</Title>
            <Small>{email}</Small>
          </View>
        </View>
        <Divider style={drawerContentStyles.divider} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
