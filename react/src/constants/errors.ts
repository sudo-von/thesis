type ResponseErrorStrings = {
  ADVICE_NOT_FOUND: string,
  INVALID_ADVICE_DATE: string,
  AUTH_HEADER_NOT_PROVIDED: string,
  INVALID_AUTH_HEADER_FORMAT: string,
  INVALID_UNSUPPORTED_HEADER_FORMAT: string,
  INVALID_CREDENTIALS: string,
  INVALID_TOKEN: string,
  UNAUTHORIZED_USER: string,
  CONTACT_NOT_FOUND: string,
  CONTACT_ALREADY_REGISTERED: string,
  INVALID_CONTACT_NUMBER: string,
  INVALID_CLASSROOM: string,
  UNIVERSITY_NOT_FOUND: string,
  INSUFFICIENT_PERMISSIONS: string,
  INVALID_USER_EMAIL: string,
  INVALID_USER_REGISTRATION_NUMBER: string,
  USER_NOT_FOUND: string,
  USER_EMAIL_ALREADY_REGISTERED: string,
  USER_REGISTRATION_NUMBER_ALREADY_REGISTERED: string,
  INVALID_MOOD_VALUE: string,
  USER_MOOD_NOT_FOUND: string,
  USER_MOOD_ALREADY_REGISTERED: string,
  INTERNAL_SERVER_ERROR: string,
  ERROR_NOT_IMPLEMENTED: string,
  UNKNOWN_ERROR: string,
};

const responseErrorStrings:ResponseErrorStrings = {
  ADVICE_NOT_FOUND: 'La asesoría que estás buscando no fue encontrada.',
  INVALID_ADVICE_DATE: 'La fecha de la asesoría no puede ser menor a la fecha actual.',
  /* Auth errors. */
  AUTH_HEADER_NOT_PROVIDED: 'El encabezado de autorización no fue proporcionado.',
  INVALID_AUTH_HEADER_FORMAT: 'El formato del encabezado de autorización es inválido.',
  INVALID_UNSUPPORTED_HEADER_FORMAT: 'El formato del encabezado de autorización no es soportado.',
  INVALID_CREDENTIALS: 'Credenciales incorrectas.',
  INVALID_TOKEN: 'El token es inválido o ha expirado.',
  UNAUTHORIZED_USER: 'El usuario no cuenta con los permisos necesarios para realizar esta acción.',
  /* Contact errors. */
  CONTACT_NOT_FOUND: 'Registra un contacto de confianza para poder utilizar el botón de pánico.',
  CONTACT_ALREADY_REGISTERED: 'Tu usuario ya cuenta con un contacto registrado.',
  INVALID_CONTACT_NUMBER: 'El número de teléfono de tu contacto es inválido.',
  /* University errors. */
  INVALID_CLASSROOM: 'El salón proporcionado no pertenece a tu universidad.',
  UNIVERSITY_NOT_FOUND: 'La universidad que estás buscando no fue encontrada.',
  /* User errors. */
  INSUFFICIENT_PERMISSIONS: 'El usuario no cuenta con los permisos necesarios para realizar esta acción',
  INVALID_USER_EMAIL: 'El correo proporcionado es inválido.',
  INVALID_USER_REGISTRATION_NUMBER: 'La matrícula proporcionada es inválida.',
  USER_NOT_FOUND: 'El usuario que estás buscando no fue encontrado.',
  USER_EMAIL_ALREADY_REGISTERED: 'El correo que deseas utilizar no está disponible.',
  USER_REGISTRATION_NUMBER_ALREADY_REGISTERED: 'La matrícula que deseas utilizar no está disponible.',
  /* User mood errors. */
  INVALID_MOOD_VALUE: 'El estado de ánimo no se encuentra en el rango válido.',
  USER_MOOD_NOT_FOUND: 'El estado de ánimo no ha sido encontrado.',
  USER_MOOD_ALREADY_REGISTERED: 'El estado de ánimo ya ha sido registrado.',
  /* General errors. */
  INTERNAL_SERVER_ERROR: 'Lo sentimos, intenta de nuevo más tarde...',
  ERROR_NOT_IMPLEMENTED: 'Algo salió mal, contacta al administrador...',
  UNKNOWN_ERROR: 'Lo sentimos, intenta de nuevo más tarde...',
};

export default responseErrorStrings;
