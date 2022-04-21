import React from 'react';
import { Bold, Small } from 'src/components';
import {
  Card, Title, Paragraph, useTheme,
} from 'react-native-paper';
import moment from 'moment';
import { TinyUser } from 'src/entities/user';
import { Classroom } from 'src/entities/classroom';
import adviceCardContentStyles from './AdiveCardContent.styles';

type AdiveCardContentProps = {
  adviceUser: TinyUser,
  adviceDate: string,
  classroom: Classroom,
  subject: string,
  studentsNumber: number,
};

const AdviceCardContent = ({
  adviceUser, adviceDate, classroom, studentsNumber, subject,
}:AdiveCardContentProps) => {
  const { colors } = useTheme();
  const date = moment(adviceDate).format('DD-MM-YYYY');
  const time = moment(adviceDate).format('hh:mm a');
  const styles = adviceCardContentStyles(colors);

  return (
    <Card.Content>
      <Title>
        <Bold>{subject}</Bold>
      </Title>
      <Small style={styles.small}>
        <Bold>{adviceUser.name}</Bold> / {adviceUser.email}
      </Small>
      <Paragraph>
        El día {date} a las {time} impartiré una asesoría de {subject} en el salón {classroom.name}.
      </Paragraph>
      { studentsNumber > 0
        && (
          <Paragraph>Se espera la asistencia de {studentsNumber}
            { studentsNumber === 1 ? ' estudiante' : ' estudiantes'}.
          </Paragraph>
        )}
    </Card.Content>
  );
};

export default AdviceCardContent;
