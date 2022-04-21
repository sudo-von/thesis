import React from 'react';
import { Alert, Linking } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { deleteAdviceByID, updateStudentsNumber } from 'src/services/advice.service';
import { useNavigation } from '@react-navigation/native';
import { TinyUser } from 'src/entities/user';
import { Advice } from 'src/entities/advice';

type AdviceCardActionsProps = {
  studentsWillAttend: string[],
  adviceID: string,
  adviceUser: TinyUser,
  userID: string,
  setAdvices: React.Dispatch<React.SetStateAction<Advice[]>>
};

type AdviceCardActionButtonProps = {
  icon: string,
  color: string,
  onPress: () => void,
  validateUser: boolean,
};

const AdviceCardActions = ({
  studentsWillAttend, adviceID, adviceUser, userID, setAdvices,
}: AdviceCardActionsProps) => {
  const navigation = useNavigation();

  const attended = studentsWillAttend.includes(userID);
  /* Updates the number of students that will go to the advice. */
  const handleAssistance = async () => {
    try {
      await updateStudentsNumber(adviceID);
      if (attended) {
        setAdvices((advices) => advices.map((advice:Advice) => (advice.id === adviceID
          ? {
            ...advice,
            studentsWillAttend: advice.studentsWillAttend.filter(
              (studentID) => studentID !== userID,
            ),
          }
          : advice)));
      } else {
        setAdvices((advices) => advices.map((advice:Advice) => (advice.id === adviceID
          ? { ...advice, students_will_attend: [...advice.studentsWillAttend, userID] }
          : advice
        )));
      }
    } catch (e) {
      Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
    }
  };

  const handleEdit = () => {
    navigation.navigate('UpdateAdvice', {
      id: adviceID,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      '¿Quieres eliminar esta asesoría?',
      'Tu asesoría puede ayudar mucho a otros estudiantes. Recuerda que esta acción no podrá ser revertida.',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar asesoría',
          onPress: async () => {
            try {
              await deleteAdviceByID(adviceID);
              setAdvices((advices) => advices.filter((advice:Advice) => advice.id !== adviceID));
            } catch (e) {
              Alert.alert('¡Ha ocurrido un error!', (e as Error).message);
            }
          },
        },
      ],
    );
  };

  /* Open a new mail. */
  const handleEmail = () => {
    Linking.openURL(`mailto:${adviceUser.email}`);
  };

  const buttons:AdviceCardActionButtonProps[] = [
    {
      icon: 'thumb-up',
      color: attended ? '#4FB1F8' : '#A7BBCA',
      onPress: handleAssistance,
      validateUser: false,
    },
    {
      icon: 'email',
      color: '#F8DD4F',
      onPress: handleEmail,
      validateUser: false,
    },
    {
      icon: 'pencil',
      color: '#F8B44F',
      onPress: handleEdit,
      validateUser: true,
    },
    {
      icon: 'delete',
      color: '#F84F4F',
      onPress: handleDelete,
      validateUser: true,
    },
  ];

  return (
    <Card.Actions>
      { buttons.map((button:AdviceCardActionButtonProps) => {
        if (button.validateUser) {
          if (userID === adviceUser.id) {
            return (
              <IconButton
                key={`${userID}-${button.icon}`}
                icon={button.icon}
                color={button.color}
                size={20}
                onPress={button.onPress}
                hasTVPreferredFocus
                tvParallaxProperties
              />
            );
          }
        } else {
          return (
            <IconButton
              key={`${userID}-${button.icon}`}
              icon={button.icon}
              color={button.color}
              size={20}
              onPress={button.onPress}
              hasTVPreferredFocus
              tvParallaxProperties
            />
          );
        }
      })}
    </Card.Actions>
  );
};

export default AdviceCardActions;
