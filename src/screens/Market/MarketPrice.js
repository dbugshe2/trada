import React, {useState} from 'react'

import Block from '../../components/primary/Block'
import Text from '../../components/primary/Text'
import Header from '../../components/Header'
import ImageIcon from '../../components/primary/ImageIcon'
import FAB from '../../components/FAB'


const MarketPrice = ({navigation}) => {
  return (
    <Block background center middle>
      <Header title="Market Price"/>
   <Block   background center middle>
      <ImageIcon  name="market"  />
      <Text muted small>Update Daily Market Price & Earn credit points</Text>
    </Block>  
    <FAB right={15} bottom={35} onPress={() => navigation.navigate("PriceUpdate")}/>
  </Block>
  )
}

export default MarketPrice
