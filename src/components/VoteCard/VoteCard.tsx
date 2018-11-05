import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  cardColor
} from './VoteCard.css'

interface Props {
    value: string,
    showValue: boolean
  }

const VoteCard = ( { value, showValue }: Props) => (
<Card >
  <CardHeader></CardHeader>
  <CardContent className={cardColor}>{value}</CardContent>
  </Card>);

export default VoteCard;

