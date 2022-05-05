import React from 'react';
import { Bold, Small } from 'src/components';
import {
  Card, Paragraph, useTheme, Badge,
} from 'react-native-paper';
import { Advice } from 'src/entities/advice';
import { handleStudentsWillAttendMessage } from 'src/helpers/advice-helper';
import { formatDate, formatTime } from 'src/helpers/date-helper';
import adviceCardContentStyles from './AdiveCardContent.styles';

type AdiveCardContentProps = {
  advice: Advice,
};

const AdviceCardContent = ({ advice }:AdiveCardContentProps) => {
  const { colors } = useTheme();
  const date = formatDate(advice.adviceDate);
  const time = formatTime(advice.adviceDate);
  const styles = adviceCardContentStyles(colors);
  const willAttendMessage = handleStudentsWillAttendMessage(advice.studentsWillAttend.length);
  const classroom = advice.classroom.name.toLowerCase();
  return (
    <Card.Content style={styles.content}>
      {willAttendMessage
        && <Badge style={styles.badge}>{willAttendMessage}</Badge>}
      <Paragraph style={styles.paragraph}><Bold>{advice.subject}</Bold></Paragraph>
      <Small style={styles.small}>{advice.user.name}</Small>
      <Paragraph>
        El día {date} a las {time} impartiré una asesoría
        el salón {classroom}.
      </Paragraph>
    </Card.Content>
  );
};

export default AdviceCardContent;
