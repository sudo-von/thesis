import { useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { getContactByUserID } from 'src/services/contact.service';
import { getLocationPermissionStatus, getCurrentPosition } from 'src/services/location.service';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Contact } from 'src/entities/contact';
import * as Location from 'expo-location';
import { formatPlatformURL } from 'src/helpers/url-helper';

const useLocation = (userID:string) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePermissions = async (): Promise<void> => {
    setMessage('Revisando permisos...');
    const status = await getLocationPermissionStatus();
    if (status !== 'granted') {
      throw new Error('Considera habilitar el permiso de ubicación, sin este permiso no podremos acceder a tu ubicación.');
    }
  };

  const handleContact = async (): Promise<Contact> => {
    setMessage('Obteniendo contacto...');
    const contact = await getContactByUserID(userID);
    return contact;
  };

  const handleCurrentPosition = async (): Promise<Location.LocationObject> => {
    setMessage('Obteniendo ubicación...');
    const location = await getCurrentPosition();
    return location;
  };

  const handleURL = (contact:Contact, location:Location.LocationObject): string => {
    setMessage('Generando mensaje de emergencia...');
    const text = formatPlatformURL(`¡Hola ${contact.contactName}! ${contact.message}`);
    const googleMapsURL = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
    const whatsappWebURL = formatPlatformURL(`https://wa.me/${contact.contactNumber}?text=${text}, esta es mi ubicación: ${googleMapsURL}`);
    return whatsappWebURL;
  };

  const handleWhatsapp = async (url:string): Promise<void> => {
    setMessage('Abriendo whatsapp...');
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      throw new Error('No ha sido posible acceder a whatsapp.');
    }
  };

  const handleMessage = async () => {
    try {
      setError(null);
      setMessage('');
      await handlePermissions();
      const contact = await handleContact();
      const location = await handleCurrentPosition();
      const url = handleURL(contact, location);
      await handleWhatsapp(url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      navigation.navigate('Home');
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleMessage();
    }, []),
  );

  return {
    message,
    error,
  };
};

export default useLocation;
