import React from 'react';
import { Bold, Small } from 'src/components';
import {
  Card, Title, Paragraph, useTheme,
} from 'react-native-paper';
import moment from 'moment';
import { Advice } from 'src/entities/advice';
import adviceCardContentStyles from './AdiveCardContent.styles';

type AdiveCardContentProps = {
  advice: Advice,
};

const AdviceCardContent = ({ advice }:AdiveCardContentProps) => {
  const { colors } = useTheme();
  const date = moment(advice.adviceDate).format('DD-MM-YYYY');
  const time = moment(advice.adviceDate).format('hh:mm a');
  const styles = adviceCardContentStyles(colors);

  return (
    <Card.Content>
      <Title>
        <Bold>{advice.subject}</Bold>
      </Title>
      <Small style={styles.small}>
        <Bold>{advice.user.name}</Bold> / {advice.user.email}
      </Small>
      <Paragraph>
        El día {date} a las {time} impartiré una asesoría de {advice.subject}
        en el salón {advice.classroom.name}.
      </Paragraph>
      { advice.studentsWillAttend.length > 0
        && (
          <Paragraph>Se espera la asistencia de {advice.studentsWillAttend.length}
            { advice.studentsWillAttend.length === 1 ? ' estudiante' : ' estudiantes'}.
          </Paragraph>
        )}
    </Card.Content>
  );
};

export default AdviceCardContent;
