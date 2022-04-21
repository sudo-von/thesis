import { useState, useEffect } from 'react';
import { Linking, Alert, Platform } from 'react-native';
import { getContactByUserID } from 'src/services/contact.service';
import { checkPermissions, getCoords } from 'src/services/location.service';
import { useNavigation } from '@react-navigation/native';
import { Contact } from 'src/entities/contact';
import * as Location from 'expo-location';

const useLocation = (userID:string) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');

  const handlePermissions = async (): Promise<void> => {
    setMessage('Revisando permisos...');
    await checkPermissions();
  };

  const handleContact = async (): Promise<Contact> => {
    setMessage('Obteniendo contacto...');
    const contact = await getContactByUserID(userID);
    return contact;
  };

  const handleLocalization = async (): Promise<Location.LocationObject> => {
    setMessage('Abriendo whatsapp...');
    const location = await getCoords();
    return location;
  };

  const handleWhatsappURL = (contact:Contact, location:Location.LocationObject): string => {
    setMessage('Abriendo whatsapp...');
    const text = Platform.OS === 'ios' ? `¡Hola ${contact.contactName}! ${contact.message}` : encodeURI(`¡Hola ${contact.contactName}! ${contact.message}`);
    const googleMapsURL = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
    const whatsappWebURL = `https://wa.me/${contact.contactNumber}?text=${text}, esta es mi ubicación: ${googleMapsURL}`;
    return whatsappWebURL;
  };

  const handleMessage = async () => {
    try {
      await handlePermissions();
      const contact = await handleContact();
      const location = await handleLocalization();
      const whatsappURL = handleWhatsappURL(contact, location);
      const supported = await Linking.canOpenURL(whatsappURL);
      if (supported) {
        await Linking.openURL(whatsappURL);
      } else {
        throw new Error('No ha sido posible acceder a la URL.');
      }
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    } finally {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    handleMessage();
  }, []);

  return {
    message,
  };
};

export default useLocation;
