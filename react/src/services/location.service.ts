import {
  PermissionStatus, LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync,
} from 'expo-location';

const getLocationPermissionStatus = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await requestForegroundPermissionsAsync();
    return status;
  } catch (error) {
    throw new Error('Ha ocurrido un error al intentar obtener los permisos de localización.');
  }
};

const getCurrentPosition = async (): Promise<LocationObject> => {
  try {
    const location = await getCurrentPositionAsync({ accuracy: 1 });
    return location;
  } catch (error) {
    throw new Error('Ha ocurrido un error al intentar acceder a tu ubicación.');
  }
};

export {
  getLocationPermissionStatus,
  getCurrentPosition,
};
