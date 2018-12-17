import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ExcellaLogoSmall from './TinyExcella.png';
import ExcellaLogoLarge from './MedExcella.png';

import {
  cardValue,
  card,
  cardHeaderStyle,
  logoImg,
} from './VoteCard.css'
import FlexView from 'react-flexview';

interface Props {
  value: string,
  showValue: boolean
}

const VoteCard = ( { value, showValue }: Props) => {
  let cardContent;
  let cardHeader;
  if (showValue) {
    cardContent = <CardContent className={cardValue}>{value}</CardContent>;
    cardHeader =  <img className={cardHeaderStyle} src={ExcellaLogoSmall}/>;
  } else {
    cardHeader = <CardHeader></CardHeader>;
    // TODO: Need to add styling to make large Excella logo responsive
    cardContent = <CardContent><img className={logoImg} src={ExcellaLogoLarge}/></CardContent>;
  }

  return  <Card className={card}>
            {cardHeader}
            <FlexView hAlignContent='center' vAlignContent='center'>
              {cardContent}
            </FlexView>
          </Card>
}

export default VoteCard;