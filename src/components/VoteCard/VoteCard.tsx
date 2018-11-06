import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import {
  cardValue,
  card
} from './VoteCard.css'

interface Props {
    value: string,
    showValue: boolean
  }

const VoteCard = ( { value, showValue }: Props) => {
  let cardContent;
  let cardHeader;
  if (showValue) {
    cardContent = <CardContent className={cardValue}>{value}</CardContent>;
    cardHeader = <CardHeader title='excellalogo'></CardHeader>;
  } else {
    cardHeader = <CardHeader></CardHeader>;
    cardContent = <CardContent>BIG Excella Logo</CardContent>;
  }

  return <Card className={card}>
            {cardHeader}
            {cardContent}
          </Card>
}

export default VoteCard;

