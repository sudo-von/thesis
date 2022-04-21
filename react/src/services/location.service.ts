import {
  PermissionStatus, LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync,
} from 'expo-location';

const checkPermissions = async (): Promise<PermissionStatus> => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Considera habilitar el permiso de ubicación, sin este permiso el botón de pánico no podrá acceder a tu ubicación.');
  }
  return status;
};

const getCoords = async (): Promise<LocationObject> => {
  try {
    const location = await getCurrentPositionAsync({ accuracy: 1 });
    return location;
  } catch (error) {
    throw new Error('No ha sido posible acceder a tu ubicación.');
  }
};

export {
  checkPermissions,
  getCoords,
};
