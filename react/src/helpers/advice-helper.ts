/* eslint-disable import/prefer-default-export */
export const handleStudentsWillAttendMessage = (studentsNumber: number): string => {
  let result = '';
  if (studentsNumber === 1) {
    result = `Confirmó asistencia ${studentsNumber} estudiante`;
  } else if (studentsNumber >= 2) {
    result = `Confirmaron asistencia ${studentsNumber} estudiantes`;
  }
  return result;
};
