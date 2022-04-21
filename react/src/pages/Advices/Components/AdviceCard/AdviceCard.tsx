import React from 'react';
import { Card } from 'react-native-paper';
import { Advice } from 'src/entities/advice';
import adviceCardStyles from './AdviceCard.styles';
import AdviceCardActions from './Components/AdviceCardActions/AdviceCardActions';
import AdviceCardContent from './Components/AdviceCardContent/AdviceCardContent';

type AdviceCardProps = {
  advice: Advice,
  setAdvices: React.Dispatch<React.SetStateAction<Advice[]>>,
  userID: string,
};

const AdviceCard = ({ advice, userID, setAdvices }:AdviceCardProps) => {
  const {
    id,
    adviceDate,
    classroom,
    subject,
    studentsWillAttend,
    user,
  }:Advice = advice;
  return (
    <Card style={adviceCardStyles.card}>
      <AdviceCardContent
        adviceDate={adviceDate}
        adviceUser={user}
        classroom={classroom}
        studentsNumber={studentsWillAttend.length}
        subject={subject}
      />
      <AdviceCardActions
        adviceID={id}
        adviceUser={user}
        userID={userID}
        studentsWillAttend={studentsWillAttend}
        setAdvices={setAdvices}
      />
    </Card>
  );
};

export default AdviceCard;
