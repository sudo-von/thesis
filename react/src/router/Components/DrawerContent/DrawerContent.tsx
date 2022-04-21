/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Header } from 'src/components';
import useUser from 'src/hooks/useUser';
import drawerContentStyles from './DrawerContent.styles';

const DrawerContent = (props:any) => {
  const { user } = useUser();
  const { universityName, universityProfilePicture } = user;
  return (
    <DrawerContentScrollView {...props}>
      <View style={drawerContentStyles.drawerContent}>
        <View style={drawerContentStyles.imageContainer}>
          <Image style={drawerContentStyles.image} source={{ uri: universityProfilePicture }} />
        </View>
        <Header
          title={universityName}
          subtitle="Universidad Autónoma de Kyoto"
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
