import * as React from 'react';
import { Card as PaperCard } from 'react-native-paper';

type CardProps = {
  children: React.ReactNode,
};

const Card = ({ children }:CardProps) => (
  <PaperCard>
    <PaperCard.Content>
      {children}
    </PaperCard.Content>
  </PaperCard>
);

export default Card;
