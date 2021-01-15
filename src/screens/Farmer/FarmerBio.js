import React, {useState} from 'react'
import Block from '../../components/primary/Block'
import Text from '../../components/primary/Text'
import Input from '../../components/primary/Input'
import Button from '../../components/primary/Button'
import Header from '../../components/Header'
import Dropdown from '../../components/Dropdown'

import { SIZES } from '../../utils/theme'

const FarmerBio = ({navigation}) => {
    return (
 <Block  background >
 <Header backTitle />

        <Block flex={1} marginVertical={10} paddingHorizontal={SIZES.padding}>
        <Text mtmedium gray h5 marginVertical={5} >Fill in farmers information to onboard.</Text>
            <Block flex={0}>
                <Input label="First Name"/>
                <Input label="Last Name"/>
                <Input label="Phone"/>
                <Dropdown defaultValue="State"/>
                <Dropdown defaultValue="LGA"/>
            </Block>


        </Block>
            <Block marginLeft={280} flex={0}>
            <Button secondary onPress={() => navigation.navigate("FarmerCultivate")}>
            <Text white center h6>Next</Text>
          </Button>
            </Block>
            
    </Block>
    )
}

export default FarmerBio
