import React, {useState} from 'react'
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView
} from "react-native";

import Block from '../../components/primary/Block'
import Text from '../../components/primary/Text'
import Header from '../../components/Header'
import FAB from '../../components/FAB'
import BackButton from '../../components/BackButton';


import { 
  SIZES, 
  COLORS 
} from '../../utils/theme'



const Farmer = ({navigation}) => {
  return (
    <Block background center middle>
      <Header backTitle="Farmer Activities"/>
   <Block  background center middle>
      <Text mtmedium muted small>Onboard Farmers in your location and earn commissions</Text>
    </Block>  
    <FAB right={15} bottom={35} onPress={() => navigation.navigate("FarmerOnboarding")}/>
  </Block>
  )
}

export default Farmer