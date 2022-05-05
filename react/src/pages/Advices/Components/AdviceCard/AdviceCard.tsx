import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { Error, Hr, Loader } from 'src/components';
import { Advice } from 'src/entities/advice';
import useAdviceCard from 'src/hooks/useAdviceCard';
import adviceCardStyles from './AdviceCard.styles';
import AdviceCardActions from './Components/AdviceCardActions/AdviceCardActions';
import AdviceCardContent from './Components/AdviceCardContent/AdviceCardContent';

type AdviceCardProps = {
  userID: string,
  advice: Advice,
  handleAdvices: () => Promise<void>,
};

const AdviceCard = ({
  advice,
  userID,
  handleAdvices,
}:AdviceCardProps) => {
  const {
    loading,
    error,
    handleEmail,
    handleUpdate,
    handleDeleteModal,
  } = useAdviceCard(advice.id, advice.user.email);
  return (
    <Card style={adviceCardStyles.card}>
      <AdviceCardContent
        advice={advice}
      />
      <Hr />
      { loading
        ? (
          <View style={adviceCardStyles.view}>
            <Loader size={20} showMessage={false} />
          </View>
        )
        : (
          <AdviceCardActions
            adviceUserID={advice.user.id}
            userID={userID}
            handleEmail={handleEmail}
            handleUpdate={handleUpdate}
            handleDeleteModal={handleDeleteModal}
            handleAdvices={handleAdvices}
          />
        )}
      { error
      && <Error message={error} /> }
    </Card>
  );
};

export default AdviceCard;
