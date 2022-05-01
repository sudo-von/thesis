/* eslint-disable import/prefer-default-export */
import { Platform } from 'react-native';

export const formatPlatformURL = (url:string) => (Platform.OS === 'ios' ? encodeURI(url) : url);
