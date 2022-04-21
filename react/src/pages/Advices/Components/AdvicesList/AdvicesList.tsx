import React from 'react';
import { ScrollView } from 'react-native';
import { Advice } from 'src/entities/advice';
import AdviceCard from '../AdviceCard/AdviceCard';

type AdvicesListProps = {
  advices: Advice[],
  setAdvices: React.Dispatch<React.SetStateAction<Advice[]>>,
  userID: string,
};

const AdvicesList = ({ advices, setAdvices, userID }: AdvicesListProps): JSX.Element => (
  <ScrollView>
    { advices.map((advice:Advice) => (
      <AdviceCard
        key={advice.id}
        userID={userID}
        advice={advice}
        setAdvices={setAdvices}
      />
    ))}
  </ScrollView>
);

export default AdvicesList;
